"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type Props = {
  gender: 'male' | 'female' | null;
  stamina: number;
};

export default function CharacterAvatar({ gender, stamina }: Props) {
  let avatar = gender === 'male' ? "/avatar/male-happy.svg" : "/avatar/female-happy.svg";

  if (stamina <= 20) avatar = gender === 'male' ? "/avatar/male-angry.svg" : "/avatar/female-angry.svg";
  else if (stamina <= 40) avatar = gender === 'male' ? "/avatar/male-sad.svg" : "/avatar/female-sad.svg";
  else if (stamina <= 70) avatar = gender === 'male' ? "/avatar/male-normal.svg" : "/avatar/female-normal.svg";

  return (
    <div className="w-20 h-20 animate-fade-in">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.4 }}>
            <Image src={avatar} alt="Avatar" width={128} height={128} className="rounded-full border-4 border-white"/>
        </motion.div>
    </div>
  );
}
