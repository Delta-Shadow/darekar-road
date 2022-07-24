import { Variants } from 'framer-motion';

export const simpleFade: Variants = {
	hidden: {
		opacity: 0,
		transition: {
			when: 'afterChildren'
		}
	},
	visible: {
		opacity: 1,
		transition: {
			when: 'beforeChildren',
			staggerChildren: 0.1
		}
	}
};
