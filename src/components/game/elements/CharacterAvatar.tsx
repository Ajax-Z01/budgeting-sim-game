"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type Props = {
  stamina: number;
};

export default function CharacterAvatar({ stamina }: Props) {
  let avatar = "/avatar/male-happy.svg";

  if (stamina <= 20) avatar = "/avatar/male-angry.svg";
  else if (stamina <= 40) avatar = "/avatar/male-sad.svg";
  else if (stamina <= 70) avatar = "/avatar/male-normal.svg";

  return (
    <div className="w-20 h-20 animate-fade-in">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.4 }}>
            <Image src={avatar} alt="Avatar Karakter" width={128} height={128} className="rounded-full border-4 border-indigo-500"/>
        </motion.div>
    </div>
  );
}
