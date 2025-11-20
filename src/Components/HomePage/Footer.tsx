import footerConfig from "../../assets/footerConfig";
import DynamicIcon from "../../SVGIcons/DynamicIcon";

const Footer: React.FC = () => {
    return (
        <footer className="w-full bg-gradient-to-r from-blue-600 to-purple-700 dark:from-gray-800 dark:to-gray-900 text-white shadow-lg">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                    {/* About Project */}
                    <section className="space-y-4">
                        <h3 className="text-xl font-bold flex items-center gap-2">
                            {footerConfig.project.name}
                        </h3>
                        <p className="text-blue-100 dark:text-gray-300 text-sm leading-relaxed">
                            {footerConfig.project.description}
                        </p>

                        <div className="space-y-2">
                            <h4 className="font-semibold text-blue-200">{footerConfig.features.available.title}</h4>
                            <ul className="text-sm text-blue-100 space-y-1">
                                {
                                    footerConfig.features.available.list.map((item, index) => {
                                        return (
                                            <li key={index}>
                                                {item}
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </section>

                    {/* Tech Stack & Status */}
                    <section className="space-y-4">
                        <h4 className="font-semibold text-lg">{footerConfig.technologies.title}</h4>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                            {
                                footerConfig.technologies.list.map((tech, index) => {
                                    return (
                                        <div key={index} className="flex items-center gap-1">
                                            <span>{tech.icon}</span> {tech.name}
                                        </div>
                                    )
                                })
                            }
                        </div>

                        <div className="space-y-2">
                            <h4 className="font-semibold text-blue-200">{footerConfig.features.upcoming.title}</h4>
                            <ul className="text-sm text-blue-100 space-y-1">
                                {
                                    footerConfig.features.upcoming.list.map((upComming, index) => {
                                        return (
                                            <li key={index}>
                                                {upComming}
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </section>

                    {/* About Creator & Links */}
                    <section className="space-y-4">
                        <h4 className="font-semibold text-lg">{footerConfig.creator.title}</h4>
                        <div className="space-y-3">
                            <p className="text-sm text-blue-100">
                                Made with ❤️ by <strong>{footerConfig.creator.name}</strong>
                            </p>

                            <div className="space-y-2">
                                {
                                    footerConfig.creator.links.map((link, index) => {
                                        return (
                                            <a
                                                key={index}
                                                href={link.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 bg-black/30 hover:bg-black/50 px-3 py-2 rounded-lg transition-colors text-sm"
                                            >
                                                <DynamicIcon icon={link.icon} />
                                                {link.title}
                                            </a>
                                        )
                                    })
                                }
                            </div>
                        </div>

                        <div className="flex items-center gap-2 bg-yellow-500/20 px-3 py-2 rounded-lg">
                            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                            <span className="text-sm">{footerConfig.project.status}</span>
                        </div>
                    </section>

                    {/* Keywords & Features */}
                    <section className="space-y-4">
                        <h4 className="font-semibold text-lg">{footerConfig.projectBenefits.title}</h4>
                        <ul className="text-sm text-blue-100 space-y-2">
                            {
                                footerConfig.projectBenefits.benefits.map((item, index) => {
                                    return (
                                        <li key={index} className="flex items-start gap-3">
                                            <span className="text-lg">{item.icon}</span>
                                            <div className="flex-1">
                                                <div className="font-medium">{item.title}</div>
                                                <div className="text-blue-200 mt-1">{item.description}</div>
                                            </div>
                                        </li>
                                    )
                                })
                            }
                        </ul>

                        <div className="flex flex-wrap gap-2">
                            {
                                footerConfig.keywords.map((tag) => (
                                    <span
                                        key={tag}
                                        className="bg-white/20 px-2 py-1 rounded text-xs"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                        </div>
                    </section>
                </div>

                {/* Copyright */}
                <div className="border-t border-white/20 mt-8 pt-6 text-center">
                    <p className="text-blue-200 text-sm">
                        {footerConfig.copyright.text.replace('year', new Date().getFullYear().toString())}
                    </p>
                    <p className="text-blue-300 text-xs mt-1">
                        {footerConfig.copyright.subText}
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;