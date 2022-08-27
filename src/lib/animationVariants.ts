import { Variants } from 'framer-motion';

export const animationProps = (variants: Variants, includeStates?: boolean) => {
	if (includeStates)
		return {
			variants,
			initial: 'hidden',
			animate: 'visible',
			exit: 'hidden'
		};
	else
		return {
			variants
		};
};

export const SimpleFade: Variants = {
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
