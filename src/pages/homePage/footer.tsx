import { Link } from "react-router-dom";
import DynamicIcon from "../../components/svgIcons/dynamicIcon";
import { useConfig } from "../../context/useProjectConfig";

const Footer: React.FC = () => {

    const config = useConfig();

    return (
        <footer className="w-full bg-gradient-to-r from-blue-600 to-purple-700 dark:from-gray-800 dark:to-gray-900 text-white shadow-lg">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* About Creator & Links */}
                    <section className="space-y-4">
                        <h4 className="font-semibold text-lg">{config.creator.title}</h4>
                        <div className="space-y-3 select-none" title={config.creator.profile.name}>
                            <div className="relative w-40 h-40 p-4 my-4 mx-auto">
                                {/* قاب عکس مدرن با افکت‌های خاص */}
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full transform scale-110 opacity-20 blur-sm"></div>

                                {/* حلقه‌های انیمیشنی */}
                                <div className="absolute inset-0 border-2 border-dashed border-blue-300 rounded-full animate-pulse"></div>
                                <div className="absolute inset-6 border border-white/30 rounded-full"></div>

                                {/* سایه و هایلایت */}
                                <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full opacity-10 blur-md"></div>

                                {/* عکس اصلی */}
                                <div className="relative z-10">
                                    <img
                                        src={config.creator.profile.photo}
                                        className="w-full h-full rounded-full border-1 border-white/80 shadow-2xl shadow-blue-500/20 object-cover transform hover:scale-105 transition-transform duration-300"
                                        alt={config.creator.profile.name}
                                    />
                                </div>

                                {/* افکت hover */}
                                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/0 to-purple-500/0 hover:from-blue-400/10 hover:to-purple-500/10 transition-all duration-300 z-20"></div>
                            </div>
                            <p className="text-sm text-center text-blue-100">
                                <strong>{config.creator.profile.name}</strong>
                            </p>
                            <p className="text-center text-sm text-gray-400 mb-6">
                                {config.creator.profile.description}
                            </p>

                            <div className="space-y-2">
                                {/* ترکیب همه لینک‌ها در یک آرایه */}
                                {[
                                    ...config.creator.links.development,
                                    ...config.creator.links.contact,
                                    ...config.creator.links.professional
                                ].map((link, index) => (
                                    <a
                                        key={index}
                                        href={link.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 bg-black/30 hover:bg-black/50 px-4 py-3 rounded-lg transition-colors text-sm"
                                    >
                                        <DynamicIcon icon={link.icon} />
                                        <div className="flex flex-col gap-2">
                                            <div className="font-medium">{link.title}</div>
                                            <div className="text-xs text-gray-400">{link.description}</div>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>

                    </section>


                    {/* About Project */}
                    <section className="space-y-4 select-none [-webkit-user-drag:none]">
                        <h3 className="text-xl font-bold flex items-center gap-2">
                            {config.project.name}
                        </h3>
                        <p className="text-blue-100 dark:text-gray-300 text-sm leading-relaxed">
                            {config.project.description}
                        </p>

                        <div className="space-y-2">
                            <h4 className="font-semibold text-blue-200">{config.features.available.title}</h4>
                            <ul className="text-sm text-blue-100 space-y-1">
                                {
                                    Object.entries(config.tools).map(([, tool], index) => {
                                        console.log(tool)
                                        return (
                                            (tool.status === 'active') ? (
                                                <li
                                                    key={index}
                                                    className="selsect-none"
                                                >
                                                    <Link
                                                        to={tool.path ?? '/*'}
                                                        className="hover:text-gray-400 active:text-red-400"
                                                    >
                                                        {tool.title}
                                                    </Link>
                                                </li>
                                            ) : null
                                        )
                                    })
                                }
                            </ul>
                        </div>

                        <div className="space-y-2">
                            <h4 className="font-semibold text-blue-200">{config.features.upcoming.title}</h4>
                            <ul className="text-sm text-blue-100 space-y-1">
                                {
                                    Object.entries(config.tools).map(([toolKey, tool]) => {
                                        return (
                                            (tool.status  === "comingSoon") ? (
                                                <li
                                                    key={toolKey}
                                                >
                                                    <Link
                                                        to={tool.path ?? '/*'}
                                                        className="hover:text-gray-400 active:text-red-400"
                                                    >
                                                        {tool.title}
                                                    </Link>
                                                </li>
                                            ) : null
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </section>

                    {/* Tech Stack & Status */}
                    <section className="space-y-4 select-none [-webkit-user-drag:none]">
                        <h4 className="font-semibold text-lg">{config.technologies.title}</h4>
                        <div className="flex flex-col gap-8 text-sm">
                            {   
                                Object.entries(config.technologies.categories).map(([techKey, tech]) => {
                                    return (
                                        <div key={techKey} className="flex flex-col gap-2">
                                            <span>{tech.title}</span>
                                            <ul className="flex flex-col">
                                                {
                                                    tech.items.map(item => (
                                                        <li className="flex gap-2 my-1">
                                                            <span>
                                                                {item.icon}
                                                            </span>
                                                            <span>
                                                                {item.name}
                                                            </span>
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                        </div>
                                    )
                                })
                            }
                        </div>

                        <div className="flex flex-col gap-2 items-start">
                            <div className="flex w-full items-center gap-2 bg-yellow-500/20 px-3 py-2 rounded-lg animate-pulse">
                                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                                <span className="text-sm">{config.project.status.title}</span>
                            </div>
                            <p className="text-sm bg-red-300/20 p-2 rounded">{config.project.status.message}</p>
                        </div>
                    </section>

                    {/* Keywords & Features */}
                    <section className="space-y-4 select-none [-webkit-user-drag:none]">
                        <h4 className="font-semibold text-lg">{config.projectBenefits.title}</h4>
                        <ul className="text-sm text-blue-100 space-y-2">
                            {
                                config.projectBenefits.benefits.map((item, index) => {
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
                                config.keywords.map((tag) => (
                                    <a
                                        key={tag}
                                        href={`https://www.google.com/search?q=${tag}`}
                                        target="_blank"
                                        className="bg-white/20 px-2 py-1 rounded text-xs hover:text-blue-300 active:text-red-400"
                                    >
                                        #{tag}
                                    </a>
                                ))}
                        </div>
                    </section>
                </div>

                {/* Copyright */}
                <div className="border-t border-white/20 mt-8 pt-6 text-center select-none [-webkit-user-drag:none]">
                    <p className="text-blue-200 text-sm">
                        {config.copyright.text.replace('{year}', new Date().getFullYear().toString())}
                    </p>
                    <p className="text-blue-300 text-xs mt-1">
                        {config.copyright.subText}
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;