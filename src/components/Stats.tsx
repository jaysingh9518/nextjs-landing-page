import { stats } from "@/data/stats";
import { motion } from "framer-motion";

const Stats: React.FC = () => {
    return (
        <section id="stats" className="py-10 lg:py-20">
            <div className="grid sm:grid-cols-3 gap-8">
                {stats.map((stat, index) => (
                    <motion.div 
                        key={stat.title} 
                        className="text-center sm:text-left max-w-md sm:max-w-full mx-auto"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.2 }}
                        // viewport={{ once: true }}
                    >
                        <h3 className="mb-5 flex items-center gap-2 text-3xl font-semibold justify-center sm:justify-start">
                            {stat.icon}
                            {stat.title}
                        </h3>
                        <p className="text-foreground-accent">{stat.description}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Stats;
