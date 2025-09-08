import type {
  CustomSection,
  CustomSectionGroup,
  URL
} from "@reactive-resume/schema";
import { Education, Experience, Volunteer } from "@reactive-resume/schema";
import { isEmptyString, sanitize } from "@reactive-resume/utils";
import React, { Fragment } from "react";

import { BrandIcon } from "../components/brand-icon";
import { useArtboardStore } from "../store/artboard";
import type { TemplateProps } from "../types/template";

const Header = () => {
  const basics = useArtboardStore((state) => state.resume.basics);
  const profiles = useArtboardStore((state) => state.resume.sections.profiles);
  
  // Find LinkedIn profile
  const linkedinProfile = profiles.items.find(item => item.network.toLowerCase() === 'linkedin');

  return (
    <div className="text-center mb-6">
      <div className="text-3xl font-bold mb-2">{basics.name}</div>
      
      <div className="text-sm">
        {basics.email && (
          <a href={`mailto:${basics.email}`} target="_blank" rel="noreferrer">
            {basics.email}
          </a>
        )}
        {basics.email && basics.url.href && <span className="mx-2">|</span>}
        {basics.url.href && (
          <a href={basics.url.href} target="_blank" rel="noreferrer">
            {basics.url.label || basics.url.href}
          </a>
        )}
        {(basics.email || basics.url.href) && basics.phone && <span className="mx-2">|</span>}
        {basics.phone && (
          <a href={`tel:${basics.phone}`} target="_blank" rel="noreferrer">
            {basics.phone}
          </a>
        )}
        {(basics.email || basics.url.href || basics.phone) && linkedinProfile && <span className="mx-2">|</span>}
        {linkedinProfile && (
          <a href={linkedinProfile.url.href} target="_blank" rel="noreferrer">
            {linkedinProfile.url.label || linkedinProfile.url.href}
          </a>
        )}
      </div>
    </div>
  );
};

const Summary = () => {
  const section = useArtboardStore((state) => state.resume.sections.summary);

  if (!section.visible || isEmptyString(section.content)) return null;

  return (
    <section id={section.id} className="mb-6">
      <h2 className="text-lg font-bold mb-1">{section.name}</h2>
      <hr className="border-black mb-3" />
      <div
        dangerouslySetInnerHTML={{ __html: sanitize(section.content) }}
        className="wysiwyg text-sm leading-relaxed"
      />
    </section>
  );
};

const Experience = () => {
  const section = useArtboardStore((state) => state.resume.sections.experience);

  if (!section.visible || section.items.length === 0) return null;

  return (
    <section id={section.id} className="mb-6">
      <h2 className="text-lg font-bold mb-1">{section.name}</h2>
      <hr className="border-black mb-3" />
      
      <div className="space-y-4">
        {section.items.map((item) => (
          <div key={item.id} className="space-y-2">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="font-bold text-sm">{item.company}, {item.position}</div>
                {item.location && (
                  <div className="text-sm">{item.location}</div>
                )}
              </div>
              <div className="text-sm text-right">{item.date}</div>
            </div>
            
            {item.summary && (
              <div
                dangerouslySetInnerHTML={{ __html: sanitize(item.summary) }}
                className="wysiwyg text-sm leading-relaxed ml-4"
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

const Education = () => {
  const section = useArtboardStore((state) => state.resume.sections.education);

  if (!section.visible || section.items.length === 0) return null;

  return (
    <section id={section.id} className="mb-6">
      <h2 className="text-lg font-bold mb-1">{section.name}</h2>
      <hr className="border-black mb-3" />
      
      <div className="space-y-2">
        {section.items.map((item) => (
          <div key={item.id} className="flex justify-between items-start">
            <div className="flex-1">
              <div className="font-bold text-sm">{item.institution}</div>
              <div className="text-sm">{item.studyType} in {item.area}</div>
            </div>
            <div className="text-sm text-right">{item.date}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

const Skills = () => {
  const section = useArtboardStore((state) => state.resume.sections.skills);

  if (!section.visible || section.items.length === 0) return null;

  return (
    <section id={section.id} className="mb-6">
      <h2 className="text-lg font-bold mb-1">{section.name}</h2>
      <hr className="border-black mb-3" />
      
      <div className="space-y-2">
        {section.items.map((item) => (
          <div key={item.id} className="space-y-1">
            <div className="font-bold text-sm">{item.name}</div>
            {item.keywords && item.keywords.length > 0 && (
              <div className="text-sm">
                {item.keywords.join(", ")}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

const Projects = () => {
  const section = useArtboardStore((state) => state.resume.sections.projects);

  if (!section.visible || section.items.length === 0) return null;

  return (
    <section id={section.id} className="mb-4">
      <h2 className="text-lg font-bold border-b border-black pb-1 mb-2">{section.name}</h2>
      
      <div className="space-y-3">
        {section.items.map((item) => (
          <div key={item.id} className="space-y-1">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="font-bold text-sm">{item.name}</div>
                <div className="text-sm">{item.description}</div>
              </div>
              {item.date && (
                <div className="text-xs text-gray-600">{item.date}</div>
              )}
            </div>
            
            {item.summary && (
              <div
                dangerouslySetInnerHTML={{ __html: sanitize(item.summary) }}
                className="wysiwyg text-xs leading-relaxed"
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

const Certifications = () => {
  const section = useArtboardStore((state) => state.resume.sections.certifications);

  if (!section.visible || section.items.length === 0) return null;

  return (
    <section id={section.id} className="mb-4">
      <h2 className="text-lg font-bold border-b border-black pb-1 mb-2">{section.name}</h2>
      
      <div className="space-y-2">
        {section.items.map((item) => (
          <div key={item.id} className="flex justify-between items-start">
            <div className="flex-1">
              <div className="font-bold text-sm">{item.name}</div>
              <div className="text-sm">{item.issuer}</div>
            </div>
            <div className="text-xs text-gray-600">{item.date}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

const Awards = () => {
  const section = useArtboardStore((state) => state.resume.sections.awards);

  if (!section.visible || section.items.length === 0) return null;

  return (
    <section id={section.id} className="mb-4">
      <h2 className="text-lg font-bold border-b border-black pb-1 mb-2">{section.name}</h2>
      
      <div className="space-y-2">
        {section.items.map((item) => (
          <div key={item.id} className="flex justify-between items-start">
            <div className="flex-1">
              <div className="font-bold text-sm">{item.title}</div>
              <div className="text-sm">{item.awarder}</div>
            </div>
            <div className="text-xs text-gray-600">{item.date}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

const Publications = () => {
  const section = useArtboardStore((state) => state.resume.sections.publications);

  if (!section.visible || section.items.length === 0) return null;

  return (
    <section id={section.id} className="mb-4">
      <h2 className="text-lg font-bold border-b border-black pb-1 mb-2">{section.name}</h2>
      
      <div className="space-y-2">
        {section.items.map((item) => (
          <div key={item.id} className="space-y-1">
            <div className="font-bold text-sm">{item.name}</div>
            <div className="text-sm">{item.publisher}</div>
            <div className="text-xs text-gray-600">{item.date}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

const Languages = () => {
  const section = useArtboardStore((state) => state.resume.sections.languages);

  if (!section.visible || section.items.length === 0) return null;

  return (
    <section id={section.id} className="mb-4">
      <h2 className="text-lg font-bold border-b border-black pb-1 mb-2">{section.name}</h2>
      
      <div className="space-y-1">
        {section.items.map((item) => (
          <div key={item.id} className="flex justify-between items-center">
            <div className="font-bold text-sm">{item.name}</div>
            <div className="text-xs text-gray-600">{item.description}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

const Interests = () => {
  const section = useArtboardStore((state) => state.resume.sections.interests);

  if (!section.visible || section.items.length === 0) return null;

  return (
    <section id={section.id} className="mb-4">
      <h2 className="text-lg font-bold border-b border-black pb-1 mb-2">{section.name}</h2>
      
      <div className="space-y-1">
        {section.items.map((item) => (
          <div key={item.id} className="space-y-1">
            <div className="font-bold text-sm">{item.name}</div>
            {item.keywords && item.keywords.length > 0 && (
              <div className="text-xs text-gray-600">
                {item.keywords.join(", ")}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

const Volunteer = () => {
  const section = useArtboardStore((state) => state.resume.sections.volunteer);

  if (!section.visible || section.items.length === 0) return null;

  return (
    <section id={section.id} className="mb-4">
      <h2 className="text-lg font-bold border-b border-black pb-1 mb-2">{section.name}</h2>
      
      <div className="space-y-3">
        {section.items.map((item) => (
          <div key={item.id} className="space-y-1">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="font-bold text-sm">{item.position}</div>
                <div className="text-sm">{item.organization}</div>
                <div className="text-xs text-gray-600">{item.location}</div>
              </div>
              <div className="text-xs text-gray-600 text-right">{item.date}</div>
            </div>
            
            {item.summary && (
              <div
                dangerouslySetInnerHTML={{ __html: sanitize(item.summary) }}
                className="wysiwyg text-xs leading-relaxed"
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

const References = () => {
  const section = useArtboardStore((state) => state.resume.sections.references);

  if (!section.visible || section.items.length === 0) return null;

  return (
    <section id={section.id} className="mb-4">
      <h2 className="text-lg font-bold border-b border-black pb-1 mb-2">{section.name}</h2>
      
      <div className="space-y-2">
        {section.items.map((item) => (
          <div key={item.id} className="space-y-1">
            <div className="font-bold text-sm">{item.name}</div>
            <div className="text-sm">{item.description}</div>
            {item.summary && (
              <div
                dangerouslySetInnerHTML={{ __html: sanitize(item.summary) }}
                className="wysiwyg text-xs leading-relaxed"
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

const Profiles = () => {
  const section = useArtboardStore((state) => state.resume.sections.profiles);

  if (!section.visible || section.items.length === 0) return null;

  return (
    <section id={section.id} className="mb-4">
      <h2 className="text-lg font-bold border-b border-black pb-1 mb-2">{section.name}</h2>
      
      <div className="space-y-1">
        {section.items.map((item) => (
          <div key={item.id} className="flex items-center space-x-2">
            <BrandIcon slug={item.icon} />
            <a 
              href={item.url.href} 
              target="_blank" 
              rel="noreferrer"
              className="text-sm hover:underline"
            >
              {item.network}: {item.username}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

const CustomSection = ({ section }: { section: CustomSectionGroup }) => {
  if (!section.visible || section.items.length === 0) return null;

  return (
    <section id={section.id} className="mb-4">
      <h2 className="text-lg font-bold border-b border-black pb-1 mb-2">{section.name}</h2>
      
      <div className="space-y-2">
        {section.items.map((item) => (
          <div key={item.id} className="space-y-1">
            <div className="font-bold text-sm">{item.name}</div>
            {item.description && (
              <div className="text-sm">{item.description}</div>
            )}
            {item.summary && (
              <div
                dangerouslySetInnerHTML={{ __html: sanitize(item.summary) }}
                className="wysiwyg text-xs leading-relaxed"
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

const Link = ({ url }: { url: URL }) => {
  if (!url.href) return null;

  return (
    <a href={url.href} target="_blank" rel="noreferrer" className="hover:underline">
      {url.label || url.href}
    </a>
  );
};

const mapSectionToComponent = (section: string) => {
  switch (section) {
    case "summary": {
      return <Summary />;
    }
    case "experience": {
      return <Experience />;
    }
    case "education": {
      return <Education />;
    }
    case "skills": {
      return <Skills />;
    }
    case "projects": {
      return <Projects />;
    }
    case "certifications": {
      return <Certifications />;
    }
    case "awards": {
      return <Awards />;
    }
    case "publications": {
      return <Publications />;
    }
    case "languages": {
      return <Languages />;
    }
    case "interests": {
      return <Interests />;
    }
    case "volunteer": {
      return <Volunteer />;
    }
    case "references": {
      return <References />;
    }
    case "profiles": {
      return <Profiles />;
    }
    default: {
      if (section.startsWith("custom.")) {
        const customSectionId = section.split(".")[1];
        const customSection = useArtboardStore((state) => state.resume.sections.custom[customSectionId]);
        return <CustomSection section={customSection} />;
      }
      return null;
    }
  }
};

export const Latex = ({ columns }: TemplateProps) => {
  const [main, sidebar] = columns;

  return (
    <div className="p-8" style={{ fontFamily: "Charter, serif" }}>
      <Header />
      
      <div className="space-y-0">
        {main.map((section) => (
          <Fragment key={section}>{mapSectionToComponent(section)}</Fragment>
        ))}
      </div>
      
      {sidebar && sidebar.length > 0 && (
        <div className="space-y-0">
          {sidebar.map((section) => (
            <Fragment key={section}>{mapSectionToComponent(section)}</Fragment>
          ))}
        </div>
      )}
    </div>
  );
};
