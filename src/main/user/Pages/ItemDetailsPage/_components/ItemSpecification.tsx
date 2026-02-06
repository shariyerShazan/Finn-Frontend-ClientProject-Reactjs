"use client";
import React from "react";
import { motion } from "framer-motion";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import {
  Car,
  Settings2,
  Calendar,
  Fuel,
  Paintbrush,
  Cpu,
  Component,
  Box,
} from "lucide-react";

const ItemSpecification = () => {
  const specs = [
    { label: "Brand", val: "Honda", icon: <Car size={16} /> },
    { label: "Transmission", val: "Automatic", icon: <Settings2 size={16} /> },
    { label: "Model", val: "Civic EX", icon: <Component size={16} /> },
    { label: "Engine", val: "I-4 2.0 L", icon: <Cpu size={16} /> },
    { label: "Built", val: "2017", icon: <Calendar size={16} /> },
    { label: "Fuel Type", val: "Gas", icon: <Fuel size={16} /> },
    { label: "Body Style", val: "SUV", icon: <Box size={16} /> },
    { label: "Color", val: "Black / White", icon: <Paintbrush size={16} /> },
  ];

  // Animation variants for the rows
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center gap-3">
        <h3 className="text-xl font-bold text-slate-800 tracking-tight relative">
          Specifications
          <span className="absolute -bottom-1 left-0 w-full h-1 bg-[#0064AE] rounded-full"></span>
        </h3>
        <div className="h-[1px] flex-1 bg-slate-100 mt-2"></div>
      </div>

      {/* Main Table Container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="border rounded-2xl overflow-hidden shadow-sm bg-white"
      >
        <Table>
          <TableBody className="grid grid-cols-1 md:grid-cols-2 divide-x divide-slate-100">
            {specs.map((s, i) => (
              <motion.div key={i} variants={itemVariants}>
                <TableRow className="flex items-center border-b border-slate-50 last:border-0 hover:bg-slate-50/80 transition-colors group cursor-default">
                  <TableCell className="w-1/2 py-4 px-6 flex items-center gap-3">
                    <div className="p-2 bg-slate-100 rounded-lg text-[#0064AE] group-hover:bg-[#0064AE] group-hover:text-white transition-all duration-300">
                      {s.icon}
                    </div>
                    <span className="font-semibold text-slate-600 text-sm">
                      {s.label}
                    </span>
                  </TableCell>
                  <TableCell className="w-1/2 py-4 px-6 text-sm font-medium text-slate-800 text-right md:text-left">
                    {s.val}
                  </TableCell>
                </TableRow>
              </motion.div>
            ))}
          </TableBody>
        </Table>
      </motion.div>
    </div>
  );
};

export default ItemSpecification;
