import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import From from "./Components/From";
export default function LoginCard() {
  return (
    <div className="flex min-h-screen items-center justify-center ">
      <Card className="w-[350px] shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <From />
        </CardContent>
      </Card>
    </div>
  );
}
