import { ReactNode } from 'react';

type FormWrapperProps = {
  title: string;
  children: ReactNode;
};

export function FormWrapper({ title, children }: FormWrapperProps) {
  return (
    <>
      <h2 className='text-center mb-8 m-0'>{title}</h2>
      <div className='grid gap-4 justify-start '>{children}</div>
    </>
  );
}
