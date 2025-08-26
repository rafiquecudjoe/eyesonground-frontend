import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const RequestConfirmation = () => {
  const navigate = useNavigate();
  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Request Posted</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-lg">Your request was posted successfully. Agents will be notified and begin applying shortly.</p>
            <div className="flex gap-2">
              <Button onClick={() => navigate('/client-dashboard/my-ads')}>View My Requests</Button>
              <Button variant="outline" onClick={() => navigate('/client-dashboard')}>Back to Dashboard</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RequestConfirmation;
