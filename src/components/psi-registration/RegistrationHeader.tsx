
interface RegistrationHeaderProps {
  title: string;
  subtitle: string;
}

export const RegistrationHeader = ({ title, subtitle }: RegistrationHeaderProps) => {
  return (
    <div className="text-center mb-6 md:mb-8">
      <h1 className="text-[#0D264B] text-xl md:text-2xl font-bold mb-2">
        {title}
      </h1>
      <p className="text-[#0D264B] text-sm md:text-base">
        {subtitle}
      </p>
    </div>
  );
};
