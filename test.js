const MobileMenu = ({ isVisible, activeSubMenu, onToggleSubmenu, onMenuClick }) => (
    <div
        id="mobile-menu"
        className={`block ${isVisible ? "h-screen" : ""} bg-white 1024px:hidden w-full`}
    >
        <button
            className="bg-primary w-full py-[15px] px-2.5 text-white pl-7"
            onClick={onMenuClick}
            aria-label="Toggle mobile menu"
        >
            <span className="flex items-center gap-0.5">
                <FaBars className="relative -left-2.5" />
                Menu
            </span>
        </button>
        <ul
            className={`transition-all duration-100 ${isVisible ? "h-[70vh] opacity-100" : "max-h-0 opacity-0"
                } overflow-auto`}
        >
            {MENU_ITEMS.map((item, index) =>
            {
                const isActive = item.submenuId && activeSubMenu === item.submenuId;

                return (
                    <li
                        key={index}
                        // CHANGED: Removed "py-5" and "bg-black" from the main LI.
                        // If it has a submenu, we remove padding so the inner div can handle the full width black bg.
                        // If it's a simple link, we keep py-5.
                        className={`border-b border-light-border ${item.submenuId ? "p-0" : "py-5"}`}
                    >
                        {item.submenuId ? (
                            <>
                                {/* WRAPPER DIV: This isolates the black background to just the header/button.
                   It handles the "py-5" padding internally now.
                */}
                                <div
                                    className={`w-full py-5 transition-colors duration-200 ${isActive ? "bg-black" : "bg-transparent"}`}
                                >
                                    <button
                                        className={`ml-[20%] flex items-center gap-4 ${isActive ? "text-active-text" : "text-black"}`}
                                        onClick={() => onToggleSubmenu(item.submenuId)}
                                        aria-expanded={isActive}
                                        aria-label={`Toggle ${item.name} submenu`}
                                    >
                                        {/* CHANGED: Icon border color now adapts to background (Active ? White/Gold : Dark) */}
                                        <i
                                            className={`rotate-45 border-r-2 border-b-2 w-2 h-2 ${isActive ? "border-active-text" : "border-dark-border"}`}
                                        />
                                        {item.name}
                                    </button>
                                </div>

                                {/* Submenu is now a sibling to the black header, sitting on the white LI background */}
                                <MobileSubmenu
                                    subMenuId={item.submenuId}
                                    links={item.links}
                                    isActive={isActive}
                                    onMenuClick={onMenuClick}
                                />
                            </>
                        ) : (
                            <Link
                                href={item.href}
                                className="text-black ml-[20%]"
                                onClick={onMenuClick}
                            >
                                {item.name}
                            </Link>
                        )}
                    </li>
                );
            })}
        </ul>
    </div>
);