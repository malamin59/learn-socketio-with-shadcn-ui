import { CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";


import { Input } from "@/components/ui/input"

export function InputDemo() {
  return <Input type="email"  placeholder="Email" />
}


const Card = () => {
  return (
    <CardAction className="">
      <CardHeader>
        <CardTitle>Responsive Card</CardTitle>
        <CardDescription>This card will adjust to screen size.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Content goes here.</p>
      </CardContent>
    </CardAction>
  );
};

export default Card;
