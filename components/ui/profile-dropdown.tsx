'use client';

import React from 'react';
import * as Dropdown from './dropdown';
import * as Avatar from './avatar';
import * as Badge from './badge';
import { Root as Divider } from './divider';
import * as Switch from './switch';
import { cn } from '@/utils/cn';
import {
  RiMoonLine,
  RiSettings2Line,
  RiTranslate,
  RiQuestionAnswerLine,
  RiLoginBoxLine,
} from '@remixicon/react';

export interface ProfileDropdownProps {
  user: {
    name: string;
    email: string;
    initials?: string;
    avatarUrl?: string;
    badge?: {
      label: string;
      color?: 'blue' | 'green' | 'purple' | 'red' | 'orange' | 'yellow';
    };
  };
  darkMode?: boolean;
  onDarkModeChange?: (enabled: boolean) => void;
  onSettingsClick?: () => void;
  onLanguageClick?: () => void;
  onHelpClick?: () => void;
  onLogoutClick?: () => void;
  className?: string;
}

export function ProfileDropdown({
  user,
  darkMode = false,
  onDarkModeChange,
  onSettingsClick,
  onLanguageClick,
  onHelpClick,
  onLogoutClick,
  className,
}: ProfileDropdownProps) {
  return (
    <Dropdown.Root>
      <Dropdown.Trigger asChild>
        <button
          className={cn(
            'flex w-full items-center gap-3 overflow-hidden rounded-[10px] bg-[color:var(--bg-white-0)] p-1.5 transition-colors duration-150 ease-out hover:bg-[color:var(--bg-weak-50)] dark:bg-[color:var(--bg-strong-950)] dark:hover:bg-[color:var(--bg-surface-800)]',
            className
          )}
        >
          <Avatar.Root size="40">
            {user.avatarUrl ? (
              <Avatar.Image src={user.avatarUrl} alt={user.name} />
            ) : (
              <span className="text-label-md font-medium text-[color:var(--text-strong-950)] dark:text-[color:var(--text-white-0)]">
                {user.initials || user.name.charAt(0)}
              </span>
            )}
          </Avatar.Root>
          <div className="flex min-w-0 flex-1 flex-col items-start gap-1">
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium leading-5 text-[color:var(--text-strong-950)] dark:text-[color:var(--text-white-0)]">
                {user.name}
              </span>
              {user.badge && (
                <Badge.Root
                  size="small"
                  variant="filled"
                  color={user.badge.color || 'green'}
                >
                  {user.badge.label}
                </Badge.Root>
              )}
            </div>
            <span className="truncate text-xs font-medium leading-4 text-[color:var(--text-soft-400)]">
              {user.email}
            </span>
          </div>
        </button>
      </Dropdown.Trigger>

      <Dropdown.Content
        align="start"
        sideOffset={8}
        className="w-[248px] overflow-hidden rounded-[18px] bg-[color:var(--bg-white-0)] p-1.5 shadow-[0_-1px_1px_-0.5px_rgba(23,23,23,0.06)_inset] dark:bg-[color:var(--bg-strong-950)]"
      >
        {/* User Profile Header */}
        <div className="flex items-center gap-3 overflow-hidden rounded-[10px] bg-[color:var(--bg-white-0)] p-2 dark:bg-[color:var(--bg-strong-950)]">
          <Avatar.Root size="40">
            {user.avatarUrl ? (
              <Avatar.Image src={user.avatarUrl} alt={user.name} />
            ) : (
              <span className="text-label-md font-medium text-[color:var(--text-strong-950)] dark:text-[color:var(--text-white-0)]">
                {user.initials || user.name.charAt(0)}
              </span>
            )}
          </Avatar.Root>
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium leading-5 text-[color:var(--text-strong-950)] dark:text-[color:var(--text-white-0)]">
                {user.name}
              </span>
              {user.badge && (
                <Badge.Root
                  size="small"
                  variant="filled"
                  color={user.badge.color || 'green'}
                >
                  {user.badge.label}
                </Badge.Root>
              )}
            </div>
            <span className="truncate text-xs font-medium leading-4 text-[color:var(--text-soft-400)]">
              {user.email}
            </span>
          </div>
        </div>

        <div className="py-1">
          <Divider variant="line" />
        </div>

        {/* Dark Mode Toggle */}
        <div className="flex items-center gap-2 overflow-hidden rounded-lg bg-[color:var(--bg-white-0)] p-2 dark:bg-[color:var(--bg-strong-950)]">
          <RiMoonLine className="h-5 w-5 text-[color:var(--text-soft-400)]" />
          <div className="flex flex-1 items-center gap-1">
            <span className="text-sm font-medium leading-5 text-[color:var(--text-sub-600)] dark:text-[color:var(--text-soft-400)]">
              Dark mode
            </span>
          </div>
          <Switch.Root
            checked={darkMode}
            onCheckedChange={onDarkModeChange}
          />
        </div>

        <div className="py-1">
          <Divider variant="line" />
        </div>

        {/* Settings */}
        <Dropdown.Item onClick={onSettingsClick}>
          <Dropdown.ItemIcon as={RiSettings2Line} />
          <span>Settings</span>
        </Dropdown.Item>

        {/* Language */}
        <div className="overflow-hidden rounded-lg bg-[color:var(--bg-weak-50)] dark:bg-[color:var(--bg-surface-800)]">
          <Dropdown.Item onClick={onLanguageClick}>
            <Dropdown.ItemIcon as={RiTranslate} />
            <span className="text-sm font-medium leading-5 text-[color:var(--text-strong-950)] dark:text-[color:var(--text-white-0)]">
              Language
            </span>
          </Dropdown.Item>
        </div>

        {/* Help */}
        <Dropdown.Item onClick={onHelpClick}>
          <Dropdown.ItemIcon as={RiQuestionAnswerLine} />
          <span>Need help?</span>
        </Dropdown.Item>

        <div className="py-1">
          <Divider variant="line" />
        </div>

        {/* Logout */}
        <Dropdown.Item onClick={onLogoutClick}>
          <Dropdown.ItemIcon
            as={RiLoginBoxLine}
            className="text-[color:var(--state-error-base)]"
          />
          <span>Log out</span>
        </Dropdown.Item>

        {/* Footer */}
        <div className="flex items-center gap-2 overflow-hidden p-2">
          <span className="text-xs leading-4 text-[color:var(--text-soft-400)]">
            v.1.5.69 · Terms & Conditions
          </span>
        </div>
      </Dropdown.Content>
    </Dropdown.Root>
  );
}
