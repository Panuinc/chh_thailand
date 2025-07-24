"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@heroui/react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function UIUnauthorized() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-row items-center justify-center w-full lg:w-6/12 p-2 gap-2 border-1 shadow-lg rounded-3xl"
    >
      <div className="flex flex-col items-center justify-center w-full h-full p-2 gap-2">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [1.2, 0.95, 1.05, 1] }}
          transition={{
            duration: 0.8,
            delay: 0.2,
            ease: "easeOut",
          }}
          className="flex items-center justify-center w-full h-full p-2 gap-2"
        >
          <Image
            src="/logo/logo.png"
            alt="Company Logo"
            width={200}
            height={200}
            priority
          />
        </motion.div>

        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.5,
            delay: 0.4,
            type: "spring",
            stiffness: 200,
          }}
          className="flex items-center justify-center w-full h-full p-2 gap-2 text-lg font-semibold"
        >
          401 - Unauthorized Access
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex items-center justify-center w-full h-full p-2 gap-2"
        >
          You are not authorized to view this page. Please login with
          appropriate credentials.
        </motion.div>

        <Link
          href="/overview"
          className="flex items-center justify-center w-full h-full p-2 gap-2"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="flex items-center justify-center w-full h-full p-2 gap-2"
          >
            <Button
              color="primary"
              radius="full"
              className="w-9/12 h-full p-3 gap-2"
            >
              Go to Dashboard
            </Button>
          </motion.div>
        </Link>
      </div>

      <motion.div
        initial={{ x: 80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.7, ease: "easeOut" }}
        className="lg:flex hidden flex-col items-center justify-center w-full h-full p-2 gap-2"
      >
        <div className="flex items-center justify-center w-full h-full p-2 gap-2">
          <Image
            src="/picture/picture.png"
            alt="picture"
            width={500}
            height={500}
            priority
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
