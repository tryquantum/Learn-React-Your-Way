'use client';

import React from 'react';
import * as Button from './button';
import * as InputNS from './input';
import * as Avatar from './avatar';
import * as Badge from './badge';
import { Root as Divider } from './divider';
import * as Tooltip from './tooltip';
import * as Popover from './popover';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { cn } from '@/utils/cn';

// RemixIcons
import {
  RiSearchLine,
  RiAddCircleLine,
  RiFolder2Line,
  RiBookOpenLine,
  RiArrowDownSLine,
  RiArrowUpSLine,
  RiSideBarLine,
  RiCloseLine,
  RiMore2Line,
  RiPushpinLine,
  RiPencilLine,
  RiDeleteBinLine,
  RiMoonLine,
  RiSettings2Line,
  RiTranslate,
  RiQuestionAnswerLine,
  RiLoginBoxLine,
} from '@remixicon/react';

export interface NavItem {
  id: string;
  title: string;
  icon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
  isActive?: boolean;
  isPinned?: boolean;
  onPin?: () => void;
  onRename?: () => void;
  onDelete?: () => void;
}

export interface UserProfile {
  name: string;
  email: string;
  avatarUrl?: string;
  initials?: string;
  badge?: {
    label: string;
    color?: 'blue' | 'green' | 'purple' | 'red' | 'orange' | 'yellow';
  };
}

export interface AISidebarProps {
  logo?: React.ReactNode;
  isCollapsed?: boolean;
  isMobileOpen?: boolean;
  onToggleSidebar?: () => void;
  onMobileClose?: () => void;
  onSearch?: (query: string) => void;
  onNewChat?: () => void;
  actionItems?: NavItem[];
  pinnedItems?: NavItem[];
  recentItems?: NavItem[];
  yesterdayItems?: NavItem[];
  user?: UserProfile;
  onProfileClick?: () => void;
}

export function AISidebar({
  logo,
  isCollapsed = false,
  isMobileOpen = false,
  onToggleSidebar,
  onMobileClose,
  onSearch,
  onNewChat,
  actionItems = [],
  pinnedItems = [],
  recentItems = [],
  yesterdayItems = [],
  user,
  onProfileClick,
}: AISidebarProps) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [recentExpanded, setRecentExpanded] = React.useState(true);
  const [yesterdayExpanded, setYesterdayExpanded] = React.useState(true);
  const [isTransitioning, setIsTransitioning] = React.useState(false);
  const [hintsDissmissed, setHintsDissmissed] = useLocalStorage('sidebar-hints-dismissed', false);
  const [isDarkMode, setIsDarkMode] = useLocalStorage('theme-dark-mode', true);
  const searchInputRef = React.useRef<HTMLInputElement>(null);
  const sidebarRef = React.useRef<HTMLDivElement>(null);
  const touchStartX = React.useRef<number>(0);
  const touchCurrentX = React.useRef<number>(0);

  // Theme management
  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Keyboard shortcuts
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Cmd/Ctrl + B: Toggle collapse
      if ((e.metaKey || e.ctrlKey) && e.key === 'b') {
        e.preventDefault();
        setIsTransitioning(true);
        onToggleSidebar?.();
        setTimeout(() => setIsTransitioning(false), 300);
      }
      // Cmd/Ctrl + K: Focus search
      else if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      // Escape: Close mobile sidebar
      else if (e.key === 'Escape' && isMobileOpen) {
        onMobileClose?.();
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isMobileOpen, onToggleSidebar, onMobileClose]);

  // Touch gesture handling for mobile swipe-to-close
  React.useEffect(() => {
    if (!isMobileOpen) return;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
      touchCurrentX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e: TouchEvent) => {
      touchCurrentX.current = e.touches[0].clientX;
      const diff = touchCurrentX.current - touchStartX.current;

      // Only allow swipe to left (close)
      if (diff < 0 && sidebarRef.current) {
        const translateX = Math.max(diff, -272);
        requestAnimationFrame(() => {
          if (sidebarRef.current) {
            sidebarRef.current.style.transform = `translateX(${translateX}px)`;
          }
        });
      }
    };

    const handleTouchEnd = () => {
      const diff = touchCurrentX.current - touchStartX.current;

      if (diff < -100) {
        // Swipe threshold reached, close sidebar
        onMobileClose?.();
      }

      // Reset transform
      if (sidebarRef.current) {
        sidebarRef.current.style.transform = '';
      }
    };

    const sidebar = sidebarRef.current;
    if (sidebar) {
      sidebar.addEventListener('touchstart', handleTouchStart);
      sidebar.addEventListener('touchmove', handleTouchMove);
      sidebar.addEventListener('touchend', handleTouchEnd);

      return () => {
        sidebar.removeEventListener('touchstart', handleTouchStart);
        sidebar.removeEventListener('touchmove', handleTouchMove);
        sidebar.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isMobileOpen, onMobileClose]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch?.(value);
  };

  const renderNavItem = (item: NavItem) => {
    const button = (
      <button
        key={item.id}
        onClick={item.onClick}
        className={cn(
          "group relative flex items-center w-full rounded-lg transition-colors duration-150 ease-out",
          isCollapsed ? "justify-center p-2" : "gap-2 px-2 py-1.5",
          item.isActive 
            ? "bg-[color:var(--bg-weak-50)] dark:bg-[color:var(--bg-weak-50)]/10" 
            : "text-[color:var(--text-sub-600)] hover:bg-[color:var(--bg-weak-50)] dark:hover:bg-[color:var(--bg-weak-50)]/10"
        )}
      >
        {item.icon && (
          <span className={cn(
            "flex items-center justify-center w-5 h-5",
            item.isActive ? "text-primary-base" : "text-[color:var(--text-soft-400)]"
          )}>
            {item.icon}
          </span>
        )}
        {!isCollapsed && (
          <>
            <span className="text-label-sm truncate flex-1 text-left">{item.title}</span>
            {(item.onPin || item.onRename || item.onDelete) && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  // TODO: Show dropdown menu
                }}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-[color:var(--bg-weak-50)] dark:hover:bg-[color:var(--bg-weak-50)]/10 rounded"
              >
                <RiMore2Line className="w-4 h-4 text-[color:var(--text-soft-400)]" />
              </button>
            )}
          </>
        )}
      </button>
    );

    if (isCollapsed && item.title) {
      return (
        <Tooltip.Root key={item.id}>
          <Tooltip.Trigger asChild>
            {button}
          </Tooltip.Trigger>
          <Tooltip.Content side="right" sideOffset={8}>
            {item.title}
          </Tooltip.Content>
        </Tooltip.Root>
      );
    }

    return button;
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden motion-safe:transition-opacity motion-safe:duration-200"
          onClick={onMobileClose}
        />
      )}

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={cn(
          "fixed left-0 top-0 flex flex-col h-screen bg-[color:var(--bg-white-0)] dark:bg-[color:var(--bg-strong-950)] z-50 translate-z-0",
          // Width transitions
          isCollapsed ? "w-16" : "w-[272px]",
          "motion-safe:transition-[width] motion-safe:duration-300 motion-safe:ease-in-out",
          isTransitioning && "will-change-[width]",
          // Mobile slide animation
          "md:translate-x-0",
          isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          "motion-safe:transition-transform motion-safe:duration-250 motion-safe:ease-out md:motion-safe:transition-[width]",
          isTransitioning && "will-change-transform"
        )}
      >
        {/* Header */}
        <div className={cn(
          "flex items-center py-3",
          isCollapsed ? "justify-center px-2" : "justify-between px-4"
        )}>
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              {logo || (
                <div className="text-subheading-2xs font-semibold text-[color:var(--text-strong-950)] dark:text-[color:var(--text-white-0)]">
                  Growtiva
                </div>
              )}
            </div>
          )}
          <div className="flex items-center gap-1">
            <Button.Root
              variant="neutral"
              mode="ghost"
              size="xsmall"
              onClick={onToggleSidebar}
              className="hidden md:flex"
            >
              <RiSideBarLine className="w-4 h-4" />
            </Button.Root>
            <Button.Root
              variant="neutral"
              mode="ghost"
              size="xsmall"
              onClick={onMobileClose}
              className="md:hidden"
            >
              <RiCloseLine className="w-4 h-4" />
            </Button.Root>
          </div>
        </div>

        {/* Search - Hidden in collapsed mode */}
        {!isCollapsed && (
          <div className="px-3 py-3">
            <InputNS.Root size="small">
              <InputNS.Wrapper>
                <InputNS.Icon>
                  <RiSearchLine className="w-4 h-4" />
                </InputNS.Icon>
                <InputNS.Input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </InputNS.Wrapper>
            </InputNS.Root>
          </div>
        )}

        {/* New Chat Button */}
        <div className={cn("pb-3", isCollapsed ? "px-2" : "px-3")}>
          {isCollapsed ? (
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <Button.Root
                  variant="primary"
                  mode="filled"
                  size="small"
                  onClick={onNewChat}
                  className="w-full !px-2"
                >
                  <RiAddCircleLine className="w-4 h-4" />
                </Button.Root>
              </Tooltip.Trigger>
              <Tooltip.Content side="right" sideOffset={8}>
                New chat
              </Tooltip.Content>
            </Tooltip.Root>
          ) : (
            <Button.Root
              variant="primary"
              mode="filled"
              size="small"
              onClick={onNewChat}
              className="w-full"
            >
              <RiAddCircleLine className="w-4 h-4" />
              New chat
            </Button.Root>
          )}
        </div>

        {/* Action Items */}
        {actionItems.length > 0 && (
          <div className={cn("pb-3", isCollapsed ? "px-2" : "px-3")}>
            <div className="flex flex-col gap-1">
              {actionItems.map((item) => renderNavItem(item))}
            </div>
          </div>
        )}

        {/* Divider */}
        {actionItems.length > 0 && !isCollapsed && (
          <div className="px-3">
            <Divider variant="line" />
          </div>
        )}

        {/* Scrollable History Section */}
        <div className={cn("flex-1 overflow-y-auto py-3", isCollapsed ? "px-2" : "px-3")}>
          {/* Pinned */}
          {pinnedItems.length > 0 && (
            <div className="mb-4">
              {!isCollapsed && (
                <div className="px-2 mb-1.5 flex items-center justify-between">
                  <span className="text-label-sm text-[color:var(--text-soft-400)]">
                    Pinned
                  </span>
                  {pinnedItems.length > 5 && (
                    <Badge.Root size="small" variant="filled" color="blue">
                      +{pinnedItems.length - 5}
                    </Badge.Root>
                  )}
                </div>
              )}
              <div className="flex flex-col gap-1">
                {pinnedItems.slice(0, 5).map((item) => renderNavItem(item))}
              </div>
            </div>
          )}

          {/* Recent */}
          {recentItems.length > 0 && !isCollapsed && (
            <div className="mb-4">
              <button
                onClick={() => setRecentExpanded(!recentExpanded)}
                className="flex items-center justify-between w-full px-2 mb-1.5 hover:bg-[color:var(--bg-weak-50)] dark:hover:bg-[color:var(--bg-weak-50)]/10 rounded transition-colors duration-150 ease-out"
              >
                <span className="text-label-sm text-[color:var(--text-soft-400)]">
                  Recent
                </span>
                <RiArrowDownSLine
                  className={cn(
                    "w-4 h-4 text-[color:var(--text-soft-400)] transition-transform duration-200",
                    recentExpanded ? "" : "-rotate-90"
                  )}
                />
              </button>
              {recentExpanded && (
                <div className="flex flex-col gap-1">
                  {recentItems.map((item) => renderNavItem(item))}
                </div>
              )}
            </div>
          )}

          {/* Yesterday */}
          {yesterdayItems.length > 0 && !isCollapsed && (
            <div className="mb-4">
              <button
                onClick={() => setYesterdayExpanded(!yesterdayExpanded)}
                className="flex items-center justify-between w-full px-2 mb-1.5 hover:bg-[color:var(--bg-weak-50)] dark:hover:bg-[color:var(--bg-weak-50)]/10 rounded transition-colors duration-150 ease-out"
              >
                <span className="text-label-sm text-[color:var(--text-soft-400)]">
                  Yesterday
                </span>
                <RiArrowDownSLine
                  className={cn(
                    "w-4 h-4 text-[color:var(--text-soft-400)] transition-transform duration-200",
                    yesterdayExpanded ? "" : "-rotate-90"
                  )}
                />
              </button>
              {yesterdayExpanded && (
                <div className="flex flex-col gap-1">
                  {yesterdayItems.map((item) => renderNavItem(item))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* User Profile Footer */}
        {user && (
          <>
            {!isCollapsed && (
              <div className="px-3">
                <Divider variant="line" />
              </div>
            )}
            {isCollapsed ? (
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <button
                    onClick={onProfileClick}
                    className="flex items-center justify-center p-3 hover:bg-[color:var(--bg-weak-50)] dark:hover:bg-[color:var(--bg-weak-50)]/10 transition-colors duration-150 ease-out"
                  >
                    <Avatar.Root size="32">
                      {user.avatarUrl ? (
                        <Avatar.Image src={user.avatarUrl} alt={user.name} />
                      ) : (
                        <span className="text-label-sm font-medium text-[color:var(--text-strong-950)] dark:text-[color:var(--text-white-0)]">
                          {user.initials || user.name.charAt(0)}
                        </span>
                      )}
                    </Avatar.Root>
                  </button>
                </Tooltip.Trigger>
                <Tooltip.Content side="right" sideOffset={8}>
                  <div className="flex flex-col gap-1">
                    <span className="font-medium">{user.name}</span>
                    <span className="text-xs text-[color:var(--text-soft-400)]">{user.email}</span>
                  </div>
                </Tooltip.Content>
              </Tooltip.Root>
            ) : (
              <Popover.Root>
                <Popover.Trigger asChild>
                  <button className="self-stretch p-1.5 mx-2 mb-2 mt-2 bg-[color:var(--bg-white-0)] dark:bg-[color:var(--bg-white-0)] rounded-[10px] inline-flex justify-start items-center gap-3 overflow-hidden hover:bg-[color:var(--bg-weak-50)] dark:hover:bg-[color:var(--bg-weak-50)] transition-colors duration-150 ease-out">
                    <Avatar.Root size="40">
                      {user.avatarUrl ? (
                        <Avatar.Image src={user.avatarUrl} alt={user.name} />
                      ) : (
                        <span className="text-label-md font-medium text-[color:var(--text-strong-950)] dark:text-[color:var(--text-white-0)]">
                          {user.initials || user.name.charAt(0)}
                        </span>
                      )}
                    </Avatar.Root>
                    <div className="flex-1 inline-flex flex-col justify-center items-start gap-1 min-w-0">
                      <div className="self-stretch inline-flex justify-start items-center gap-1">
                        <span className="text-label-sm font-medium text-[color:var(--text-strong-950)] dark:text-[color:var(--text-white-0)] truncate">
                          {user.name}
                        </span>
                        {user.badge && (
                          <Badge.Root
                            size="small"
                            variant="filled"
                            color={user.badge.color || 'blue'}
                          >
                            {user.badge.label}
                          </Badge.Root>
                        )}
                      </div>
                      <span className="self-stretch text-paragraph-sm text-[color:var(--text-soft-400)] truncate">
                        {user.email}
                      </span>
                    </div>
                    <div className="size-6 p-[3px] bg-[color:var(--bg-weak-50)] dark:bg-[color:var(--bg-surface-700)] rounded-md shadow-[0px_0px_0px_1px_rgba(23,23,23,0.08)] dark:shadow-[0px_0px_0px_1px_rgba(255,255,255,0.08)] flex justify-center items-center gap-0.5 overflow-hidden flex-shrink-0">
                      <RiArrowUpSLine className="w-[18px] h-[18px] text-[color:var(--icon-sub-600)]" />
                    </div>
                  </button>
                </Popover.Trigger>

                <Popover.Content
                  align="start"
                  side="right"
                  sideOffset={8}
                  className="w-60 p-1.5 bg-[color:var(--bg-white-0)] dark:bg-[color:var(--bg-strong-950)] rounded-2xl shadow-[0px_0px_0px_1px_rgba(23,23,23,0.08)] shadow-[0px_1px_1px_-0.5px_rgba(23,23,23,0.04)] shadow-[0px_3px_3px_-1.5px_rgba(23,23,23,0.04)] shadow-[0px_6px_6px_-3px_rgba(23,23,23,0.04)] shadow-[0px_10px_10px_-5px_rgba(23,23,23,0.04)] shadow-[0px_20px_20px_-10px_rgba(23,23,23,0.04)] dark:shadow-[0px_0px_0px_1px_rgba(255,255,255,0.08)] inline-flex flex-col justify-start items-start gap-1 overflow-hidden"
                  unstyled
                >
                  {/* User Info Section */}
                  <div className="self-stretch p-2 bg-[color:var(--bg-white-0)] dark:bg-[color:var(--bg-strong-950)] rounded-[10px] inline-flex justify-start items-center gap-3 overflow-hidden">
                    <Avatar.Root size="40">
                      {user.avatarUrl ? (
                        <Avatar.Image src={user.avatarUrl} alt={user.name} />
                      ) : (
                        <span className="text-label-md font-medium text-[color:var(--text-strong-950)] dark:text-[color:var(--text-white-0)]">
                          {user.initials || user.name.charAt(0)}
                        </span>
                      )}
                    </Avatar.Root>
                    <div className="flex-1 inline-flex flex-col justify-center items-start gap-1">
                      <div className="self-stretch inline-flex justify-start items-center gap-1">
                        <span className="text-label-sm font-medium text-[color:var(--text-strong-950)] dark:text-[color:var(--text-white-0)] truncate">
                          {user.name}
                        </span>
                        {user.badge && (
                          <Badge.Root
                            size="small"
                            variant="filled"
                            color={user.badge.color || 'blue'}
                          >
                            {user.badge.label}
                          </Badge.Root>
                        )}
                      </div>
                      <span className="self-stretch text-paragraph-sm text-[color:var(--text-soft-400)] truncate">
                        {user.email}
                      </span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="self-stretch py-[1.50px] inline-flex justify-center items-center gap-2">
                    <div className="flex-1 h-px bg-[color:var(--stroke-soft-200)] dark:bg-[color:var(--stroke-soft-200)]" />
                  </div>

                  {/* Dark Mode Toggle */}
                  <button
                    onClick={handleThemeToggle}
                    className="self-stretch p-2 bg-[color:var(--bg-white-0)] dark:bg-[color:var(--bg-strong-950)] rounded-lg inline-flex justify-start items-center gap-2 overflow-hidden hover:bg-[color:var(--bg-weak-50)] dark:hover:bg-[color:var(--bg-weak-50)] transition-colors"
                  >
                    <RiMoonLine className="w-5 h-5 text-[color:var(--icon-sub-600)]" />
                    <div className="flex-1 flex justify-start items-center gap-1">
                      <span className="text-label-sm text-[color:var(--text-sub-600)] dark:text-[color:var(--text-sub-600)]">
                        Dark mode
                      </span>
                    </div>
                    <div className={cn(
                      "relative w-9 h-5 rounded-full transition-colors",
                      isDarkMode ? "bg-primary-base" : "bg-[color:var(--bg-soft-200)]"
                    )}>
                      <div className={cn(
                        "absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform",
                        isDarkMode ? "translate-x-4" : "translate-x-0.5"
                      )} />
                    </div>
                  </button>

                  {/* Divider */}
                  <div className="self-stretch py-[1.50px] inline-flex justify-center items-center gap-2">
                    <div className="flex-1 h-px bg-[color:var(--stroke-soft-200)] dark:bg-[color:var(--stroke-soft-200)]" />
                  </div>

                  {/* Settings */}
                  <button
                    onClick={onProfileClick}
                    className="self-stretch p-2 bg-[color:var(--bg-white-0)] dark:bg-[color:var(--bg-strong-950)] rounded-lg inline-flex justify-start items-center gap-2 overflow-hidden hover:bg-[color:var(--bg-weak-50)] dark:hover:bg-[color:var(--bg-weak-50)] transition-colors"
                  >
                    <RiSettings2Line className="w-5 h-5 text-[color:var(--icon-sub-600)]" />
                    <div className="flex-1 flex justify-start items-center gap-1">
                      <span className="text-label-sm text-[color:var(--text-sub-600)] dark:text-[color:var(--text-sub-600)]">
                        Settings
                      </span>
                    </div>
                  </button>

                  {/* Language */}
                  <button
                    onClick={onProfileClick}
                    className="self-stretch p-2 bg-[color:var(--bg-weak-50)] dark:bg-[color:var(--bg-weak-50)] rounded-lg inline-flex justify-start items-center gap-2 overflow-hidden hover:bg-[color:var(--bg-weak-50)] dark:hover:bg-[color:var(--bg-weak-50)] transition-colors"
                  >
                    <RiTranslate className="w-5 h-5 text-[color:var(--icon-sub-600)]" />
                    <div className="flex-1 flex justify-start items-center gap-1">
                      <span className="text-label-sm text-[color:var(--text-strong-950)] dark:text-[color:var(--text-strong-950)]">
                        Language
                      </span>
                    </div>
                  </button>

                  {/* Need Help */}
                  <button
                    onClick={onProfileClick}
                    className="self-stretch p-2 bg-[color:var(--bg-white-0)] dark:bg-[color:var(--bg-strong-950)] rounded-lg inline-flex justify-start items-center gap-2 overflow-hidden hover:bg-[color:var(--bg-weak-50)] dark:hover:bg-[color:var(--bg-weak-50)] transition-colors"
                  >
                    <RiQuestionAnswerLine className="w-5 h-5 text-[color:var(--icon-sub-600)]" />
                    <div className="flex-1 flex justify-start items-center gap-1">
                      <span className="text-label-sm text-[color:var(--text-sub-600)] dark:text-[color:var(--text-sub-600)]">
                        Need help?
                      </span>
                    </div>
                  </button>

                  {/* Divider */}
                  <div className="self-stretch py-[1.50px] inline-flex justify-center items-center gap-2">
                    <div className="flex-1 h-px bg-[color:var(--stroke-soft-200)] dark:bg-[color:var(--stroke-soft-200)]" />
                  </div>

                  {/* Logout */}
                  <button
                    onClick={onProfileClick}
                    className="self-stretch p-2 bg-[color:var(--bg-white-0)] dark:bg-[color:var(--bg-strong-950)] rounded-lg inline-flex justify-start items-center gap-2 overflow-hidden hover:bg-[color:var(--bg-weak-50)] dark:hover:bg-[color:var(--bg-weak-50)] transition-colors"
                  >
                    <RiLoginBoxLine className="w-5 h-5 text-[color:var(--error-base)]" />
                    <div className="flex-1 flex justify-start items-center gap-1">
                      <span className="text-label-sm text-[color:var(--text-sub-600)] dark:text-[color:var(--text-sub-600)]">
                        Log out
                      </span>
                    </div>
                  </button>

                  {/* Footer */}
                  <div className="self-stretch p-2 bg-[color:var(--bg-white-0)] dark:bg-[color:var(--bg-strong-950)] inline-flex justify-start items-center gap-2 overflow-hidden">
                    <span className="flex-1 text-paragraph-sm text-[color:var(--text-soft-400)] dark:text-[color:var(--text-soft-400)]">
                      v.1.5.69 · Terms & Conditions
                    </span>
                  </div>
                </Popover.Content>
              </Popover.Root>
            )}
          </>
        )}
      </div>
    </>
  );
}
