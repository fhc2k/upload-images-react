import { motion, AnimatePresence } from "framer-motion";

const container = {
	hidden: { y: -20, opacity: 1 },
	visible: {
		y: 0,
		opacity: 1,
		transition: {
			delayChildren: 0.3,
			staggerChildren: 0.1,
		},
	},
	exit: { y: -20, opacity: 0 },
};

const item = {
	hidden: { x: 20, opacity: 0 },
	visible: {
		x: 0,
		opacity: 1,
	},
};

export const MenuDropdown = {
	menu: ({ children, className }) => (
		<div className="relative">{children}</div>
	),
	dropdown: ({ children }) => (
		<motion.div
			variants={container}
			initial="hidden"
			animate="visible"
			exit="exit"
			className={`absolute right-0 bg-white w-max flex flex-col px-2 py-4 border border-gray-200 rounded-lg shadow-lg z-50`}
		>
			{children}
		</motion.div>
	),
	transition: ({ children }) => <AnimatePresence>{children}</AnimatePresence>,
	button: ({ children }) => (
		<div className="flex items-center gap-2">{children}</div>
	),
	item: ({ children }) => (
		<motion.span
			variants={item}
			className="text-black text-sm cursor-pointer hover:bg-gray-100 px-4 py-2 rounded-md"
		>
			{children}
		</motion.span>
	),
};
