'use client';

import React, { useState, useMemo } from 'react';
import { RiFolder2Fill, RiSearchLine } from '@remixicon/react';
import { ProjectCard } from '@/components/ui/project-card';
import * as InputNS from '@/components/ui/input';
import contentKitsData from '@/data/content-kits.json';

interface ContentKit {
  id: string;
  name: string;
  description: string;
  niche: string;
  tierLevel: 'free' | 'pro';
  contents: string[];
  metadata: {
    templateCount: number;
    downloadCount: number;
    rating: number;
    lastUpdated: string;
    updatedDaysAgo: number;
    tags: string[];
  };
}

export default function ContentVaultPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedKitId, setSelectedKitId] = useState<string | null>(null);
  const [pinnedKits, setPinnedKits] = useState<string[]>([]);
  const [filterTier, setFilterTier] = useState<'all' | 'free' | 'pro'>('all');

  const kits = contentKitsData.kits as ContentKit[];

  // Filter and search logic
  const filteredKits = useMemo(() => {
    return kits.filter((kit) => {
      const matchesSearch = 
        kit.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        kit.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        kit.metadata.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesTier = filterTier === 'all' || kit.tierLevel === filterTier;
      
      return matchesSearch && matchesTier;
    });
  }, [kits, searchQuery, filterTier]);

  // Sort: pinned first, then by name
  const sortedKits = useMemo(() => {
    return [...filteredKits].sort((a, b) => {
      const aIsPinned = pinnedKits.includes(a.id);
      const bIsPinned = pinnedKits.includes(b.id);
      
      if (aIsPinned && !bIsPinned) return -1;
      if (!aIsPinned && bIsPinned) return 1;
      
      return a.name.localeCompare(b.name);
    });
  }, [filteredKits, pinnedKits]);

  const handlePin = (id: string) => {
    setPinnedKits(prev => 
      prev.includes(id) ? prev.filter(kitId => kitId !== id) : [...prev, id]
    );
  };

  const handleRename = (id: string) => {
    // Placeholder for rename functionality
    console.log('Rename kit:', id);
  };

  const handleDelete = (id: string) => {
    // Placeholder for delete functionality
    console.log('Delete kit:', id);
  };

  return (
    <div className="w-full h-full p-6 md:p-8 animate-in slide-in-from-bottom-4 fade-in duration-500">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary-base/10 dark:bg-primary-base/20">
            <RiFolder2Fill className="w-6 h-6 text-primary-base" />
          </div>
          <div>
            <h1 className="text-title-h3 font-semibold text-strong-950 dark:text-white-0">
              Content Vault
            </h1>
            <p className="text-paragraph-sm text-sub-600 dark:text-soft-400">
              Browse and download niche-specific content templates
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex-1">
          <InputNS.Root size="medium" className="w-full">
            <InputNS.Wrapper>
              <InputNS.Icon>
                <RiSearchLine className="w-4 h-4" />
              </InputNS.Icon>
              <InputNS.Input
                type="text"
                placeholder="Search content kits..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </InputNS.Wrapper>
          </InputNS.Root>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setFilterTier('all')}
            className={`px-4 py-2 rounded-lg text-label-sm font-medium transition-colors ${
              filterTier === 'all'
                ? 'bg-primary-base text-static-white'
                : 'bg-weak-50 text-sub-600 hover:bg-soft-100 dark:bg-surface-800 dark:text-soft-400 dark:hover:bg-surface-700'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilterTier('free')}
            className={`px-4 py-2 rounded-lg text-label-sm font-medium transition-colors ${
              filterTier === 'free'
                ? 'bg-primary-base text-static-white'
                : 'bg-weak-50 text-sub-600 hover:bg-soft-100 dark:bg-surface-800 dark:text-soft-400 dark:hover:bg-surface-700'
            }`}
          >
            Free
          </button>
          <button
            onClick={() => setFilterTier('pro')}
            className={`px-4 py-2 rounded-lg text-label-sm font-medium transition-colors ${
              filterTier === 'pro'
                ? 'bg-primary-base text-static-white'
                : 'bg-weak-50 text-sub-600 hover:bg-soft-100 dark:bg-surface-800 dark:text-soft-400 dark:hover:bg-surface-700'
            }`}
          >
            Pro
          </button>
        </div>
      </div>

      {/* Content Grid */}
      {sortedKits.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {sortedKits.map((kit) => (
            <ProjectCard
              key={kit.id}
              id={kit.id}
              name={kit.name}
              description={kit.description}
              templateCount={kit.metadata.templateCount}
              isActive={selectedKitId === kit.id}
              isPinned={pinnedKits.includes(kit.id)}
              tierLevel={kit.tierLevel}
              onPin={handlePin}
              onRename={handleRename}
              onDelete={handleDelete}
              onClick={setSelectedKitId}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-weak-50 dark:bg-surface-800 mb-4">
            <RiSearchLine className="w-8 h-8 text-sub-600 dark:text-soft-400" />
          </div>
          <h3 className="text-label-lg font-medium text-strong-950 dark:text-white-0 mb-1">
            No kits found
          </h3>
          <p className="text-paragraph-sm text-sub-600 dark:text-soft-400">
            Try adjusting your search or filters
          </p>
        </div>
      )}
    </div>
  );
}
