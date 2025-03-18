import SectionTitle from "./SectionTitle";

interface Props {
    id: string;
    title: string;
    description: string;
}

const Section: React.FC<React.PropsWithChildren<Props>> = ({ id, title, description, children }: React.PropsWithChildren<Props>) => {
    return (
        <section id={id} className="pt-10 pb-8 lg:pt-15 lg:pb-10">
            <SectionTitle>
                <h2 className="text-center mb-4">{title}</h2>
            </SectionTitle>
            <p className="mb-12 text-center">{description}</p>
            {children}
        </section>
    )
}

export default Section