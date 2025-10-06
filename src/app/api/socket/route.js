// 🔥 Socket.IO থেকে Server class import করছি
import { Server } from "socket.io";

// how to create a io ?? & how it work ? hay use this (io) ? must be use here io  can i not use any name here ??  hay to create let io ?? 
let io; // ⚡ গ্লোবাল ভ্যারিয়েবল, যাতে সার্ভার একবারই তৈরি হয় ??

// 🌐 Next.js API Route (GET মেথড)   
// // why create GET api ?? & how it work ? & must be call GET api here ??
export async function GET() {
  // 🧠 যদি সার্ভার আগে তৈরি না হয়, তাহলে নতুন সার্ভার বানাও
  //why to check validation ?? if i don't check validation/if condition here so this not work ? how to to create a new Server ?? 
  if (!io) {
    io = new Server(3001, {
      cors: {  // what is cors ? why use cors ? how it work ? who to use cors ? 
        origin: "*", // ✅ যেকোনো client connect করতে পারবে who to use origin:"*" ?? hoy we this ? how it work ? if i don't write cors&origin so my code is not work ?? hwy use the symbol(*) ?
      },
    });

    // ⚡ যখন কোনো client connect করে
    // why use io.on ? what is on ?? how to work with in.on ?? how it work ??
    // i mset use use "connection" ? if not so my code work ?? (socket) why ? must be use socket if use here my name like (alamin) so my code is work  ?
    io.on("connection", (socket) => {
      console.log("✅ নতুন ইউজার কানেক্ট হয়েছে:", socket.id);

      // 📩 যখন client থেকে message আসে
      // why use this socket.on ?? how it work ?? must be use "sendMessage" (data) why ?? muse be write (data)
      socket.on("sendMessage", (data) => {
        console.log("📩 বার্তা এসেছে:", data);

        // 📢 সকল ক্লায়েন্টকে message পাঠানো
        //what is emit ?? how it work ?? must be "receiveMessage", | & data ?? if not so code is work ??
        io.emit("receiveMessage", data);
      });

      //  যখন কোনো ইউজার disconnect করে
      // how to use below code ? how it work ???? when we use this code ?? must be use "disconnect" ? must be use aro function ??
      socket.on("disconnect", () => {
        console.log(" ইউজার চলে গেছে:", socket.id);
      });
    });
  }

  // ✅ সার্ভার চালু আছে, রেসপন্স পাঠানো
  return Response.json({ message: "Socket server চলছে ✅" });
}

// PLEASE GIVE ME MY ALL QUESTION ANSWER IN BANGLA & EXPLAIN MORE MY ALL QUESTION BECAUSE I WENT STRONG MY FUNDAMENTAL 
