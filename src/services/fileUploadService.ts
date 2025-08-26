class FileUploadService {
    private baseUrl: string;

    constructor() {
        this.baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
    }

    async uploadFile(file: File, folder?: string): Promise<{
        success: boolean;
        fileUrl: string;
        fileName: string;
        size: number;
        mimeType: string;
    }> {
        try {
            const formData = new FormData();
            formData.append('file', file);
            if (folder) {
                formData.append('folder', folder);
            }

            const response = await fetch(`${this.baseUrl}/files/upload`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`File upload failed: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error uploading file:', error);
            throw error;
        }
    }

    async uploadMultipleFiles(files: File[], folder?: string): Promise<{
        success: boolean;
        files: Array<{
            fileUrl: string;
            fileName: string;
            size: number;
            mimeType: string;
        }>;
    }> {
        try {
            const formData = new FormData();
            files.forEach((file) => {
                formData.append('files', file);
            });
            if (folder) {
                formData.append('folder', folder);
            }

            const response = await fetch(`${this.baseUrl}/files/upload-multiple`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`File upload failed: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error uploading files:', error);
            throw error;
        }
    }

    async deleteFile(fileUrl: string): Promise<{ success: boolean; message: string }> {
        try {
            const response = await fetch(`${this.baseUrl}/files/delete`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ fileUrl }),
            });

            if (!response.ok) {
                throw new Error(`File deletion failed: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error deleting file:', error);
            throw error;
        }
    }

    async getPresignedUrl(fileName: string, contentType: string, folder?: string): Promise<{
        success: boolean;
        presignedUrl: string;
    }> {
        try {
            const response = await fetch(`${this.baseUrl}/files/presigned-url`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fileName,
                    contentType,
                    folder,
                }),
            });

            if (!response.ok) {
                throw new Error(`Presigned URL generation failed: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error generating presigned URL:', error);
            throw error;
        }
    }

    validateFile(file: File): { isValid: boolean; error?: string } {
        // Max file size: 10MB
        const maxSize = 10 * 1024 * 1024;
        if (file.size > maxSize) {
            return { isValid: false, error: 'File size cannot exceed 10MB' };
        }

        // Allowed file types
        const allowedMimeTypes = [
            'image/jpeg',
            'image/png',
            'image/gif',
            'image/webp',
            'video/mp4',
            'video/mpeg',
            'video/quicktime',
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ];

        if (!allowedMimeTypes.includes(file.type)) {
            return { isValid: false, error: 'File type not supported' };
        }

        return { isValid: true };
    }

    formatFileSize(bytes: number): string {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
}

export const fileUploadService = new FileUploadService();
