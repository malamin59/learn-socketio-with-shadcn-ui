import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h3 className="text-4xl"> hello world</h3>
      <Button  variant='alamin' size='sm'>
        Clink Me
      </Button>
    </div>
  );
}
