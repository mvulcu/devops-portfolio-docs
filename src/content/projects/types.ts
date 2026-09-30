import React from 'react';

export interface SubsectionItem {
  id: string;
  title: string;
}

export interface DocSection {
  id: string;
  title: string;
  level?: number;
  subsections?: SubsectionItem[];
  content: {
    lead?: string;
    paragraphs?: string[];
    codeBlock?: {
      language: string;
      filename?: string;
      code: string;
    };
    listItems?: { label?: string; text: string }[];
    architectureDiagram?: string;
    customNode?: React.ReactNode;
  };
}

export interface MetaRowItem {
  label: string;
  value: string;
}

export interface ProjectLinkItem {
  label: string;
  url: string;
}

export interface ProjectContent {
  slug: string;
  title: string;
  tagline: string;
  lastUpdated: string;
  status?: string;
  productionUrl?: string;
  links?: ProjectLinkItem[];
  metaRow?: MetaRowItem[];
  sections: DocSection[];
}
