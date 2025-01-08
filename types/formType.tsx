// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface FormProps {
    type: string;
    post: {
      prompt: string;
      tag: string;
    };
    setpost: (post: { prompt: string; tag: string }) => void;
    submitting: boolean;
    handleSubmit: (e: React.FormEvent) => void;
}
  