import type { Collection } from "tinacms";

export const HomeCollection: Collection = {
  name: "home",
  label: "Home Page",
  path: "src/content/home",
  format: "json",
  ui: {
    allowedActions: {
      create: false,
      delete: false,
    },
    router: () => "/",
  },
  fields: [
    {
      name: "seoTitle",
      type: "string",
      required: true,
      label: "SEO Title"
    },
    {
      name: "seo",
      label: "SEO",
      type: "object",
      fields: [
        { name: "title", label: "Title", type: "string" },
        { name: "description", label: "Description", type: "string" },
        { name: "keywords", label: "Keywords", type: "string" },
        { name: "robots", label: "Robots", type: "string" },
        { name: "language", label: "Language", type: "string" },
        { name: "author", label: "Author", type: "string" },
        { name: "canonical", label: "Canonical URL", type: "string" },
        {
          name: "og",
          label: "Open Graph",
          type: "object",
          fields: [
            { name: "type", label: "Type", type: "string" },
            { name: "url", label: "URL", type: "string" },
            { name: "title", label: "Title", type: "string" },
            { name: "description", label: "Description", type: "string" },
            { name: "siteName", label: "Site Name", type: "string" },
            { name: "locale", label: "Locale", type: "string" },
          ],
        },
        {
          name: "twitter",
          label: "Twitter",
          type: "object",
          fields: [
            { name: "card", label: "Card", type: "string" },
            { name: "url", label: "URL", type: "string" },
            { name: "title", label: "Title", type: "string" },
            { name: "description", label: "Description", type: "string" },
          ],
        },
      ],
    },
    {
      name: "colors",
      label: "Colors",
      type: "object",
      fields: [
        { name: "yellow", label: "Yellow", type: "string" },
        { name: "lightyellow", label: "Light Yellow", type: "string" },
        { name: "lighteryellow", label: "Lighter Yellow", type: "string" },
        { name: "blue", label: "Blue", type: "string" },
        { name: "lightblue", label: "Light Blue", type: "string" },
        { name: "textblack", label: "Text Black", type: "string" },
        { name: "black", label: "Black", type: "string" },
        { name: "grey", label: "Grey", type: "string" },
        { name: "lightgrey", label: "Light Grey", type: "string" },
        { name: "white", label: "White", type: "string" },
      ],
    },
    {
      name: "navbar",
      label: "Navbar",
      type: "object",
      fields: [
        { name: "wordlogo", label: "Word Logo", type: "string" },
      ],
    },
    {
      name: "sections",
      label: "Sections",
      type: "object",
      fields: [
        {
          name: "landingpage",
          label: "Landing Page",
          type: "object",
          fields: [
            { name: "logo", label: "Logo", type: "string" },
          ],
        },
        {
          name: "about",
          label: "About",
          type: "object",
          fields: [
            { name: "headertext", label: "Header Text", type: "string" },
            { name: "paratext", label: "Para Text", type: "string" },
            {
              name: "text",
              label: "Text",
              type: "object",
              list: true,
              fields: [
                { name: "type", label: "Type", type: "string" },
                { name: "text", label: "Text", type: "string" },
              ],
            },
          ],
        },
        {
          name: "info",
          label: "Info",
          type: "object",
          fields: [
            { name: "headertext", label: "Header Text", type: "string" },
            { name: "paratext", label: "Para Text", type: "string" },
            {
              name: "text",
              label: "Text",
              type: "object",
              list: true,
              fields: [
                { name: "type", label: "Type", type: "string" },
                { name: "text", label: "Text", type: "string" },
              ],
            },
          ],
        },
        {
          name: "testimonial",
          label: "Testimonial",
          type: "object",
          fields: [
            {
              name: "bigtestimonials",
              label: "Big Testimonials",
              type: "object",
              list: true,
              fields: [
                { name: "text", label: "Text", type: "string" },
                { name: "author", label: "Author", type: "string" },
                { name: "company", label: "Company", type: "string" },
                { name: "image", label: "Image", type: "image" },
              ],
            },
            {
              name: "longtestimonials",
              label: "Long Testimonials",
              type: "object",
              list: true,
              fields: [
                { name: "header", label: "Header", type: "string" },
                { name: "text", label: "Text", type: "string" },
                { name: "author", label: "Author", type: "string" },
                { name: "company", label: "Company", type: "string" },
              ],
            },
            {
              name: "minitestimonials",
              label: "Mini Testimonials",
              type: "object",
              list: true,
              fields: [
                { name: "text", label: "Text", type: "string" },
                { name: "author", label: "Author", type: "string" },
              ],
            },
          ],
        },
        {
          name: "getaquote",
          label: "Get a Quote",
          type: "object",
          fields: [
            {
              name: "questions",
              label: "Questions",
              type: "object",
              list: true,
              fields: [
                {
                  name: "items",
                  label: "Items",
                  type: "object",
                  list: true,
                  fields: [
                    { name: "question", label: "Question", type: "string" },
                    { name: "type", label: "Type", type: "string" },
                  ],
                },
              ],
            },
          ],
        },
        {
          name: "aboutalice",
          label: "About Alice",
          type: "object",
          fields: [
            { name: "headertext", label: "Header Text", type: "string" },
            { name: "name", label: "Name", type: "string" },
            { name: "paratext", label: "Para Text", type: "string" },
            {
              name: "text",
              label: "Text",
              type: "object",
              list: true,
              fields: [
                { name: "type", label: "Type", type: "string" },
                { name: "text", label: "Text", type: "string" },
              ],
            },
            {
              name: "specialisms",
              label: "Specialisms",
              type: "string",
              list: true,
            },
            {
              name: "contact",
              label: "Contact",
              type: "object",
              fields: [
                { name: "phone", label: "Phone", type: "string" },
                { name: "email", label: "Email", type: "string" },
                { name: "address", label: "Address", type: "string" },
                { name: "hours", label: "Hours", type: "string" },
              ],
            },
          ],
        },
        {
          name: "services",
          label: "Services",
          type: "object",
          fields: [
            {
              name: "services",
              label: "Services",
              type: "object",
              list: true,
              fields: [
                { name: "title", label: "Title", type: "string" },
                { name: "info", label: "Info", type: "string" },
                { name: "image", label: "Image", type: "image" },
                {
                  name: "text",
                  label: "Text",
                  type: "object",
                  list: true,
                  fields: [
                    { name: "type", label: "Type", type: "string" },
                    { name: "text", label: "Text", type: "string" },
                    { name: "highlightedWord", label: "Highlighted Word", type: "string" },
                    {
                      name: "points",
                      label: "Points",
                      type: "object",
                      list: true,
                      fields: [
                        { name: "type", label: "Type", type: "string" },
                        { name: "text", label: "Text", type: "string" },
                        { name: "highlightedWord", label: "Highlighted Word", type: "string" },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          name: "contactus",
          label: "Contact Us",
          type: "object",
          fields: [
            { name: "email", label: "Email", type: "string" },
            { name: "image", label: "Image", type: "image" },
          ],
        },
      ],
    },
    {
      name: "chatbox",
      label: "Chatbox",
      type: "object",
      fields: [
        {
          name: "colors",
          label: "Colors",
          type: "object",
          fields: [
            { name: "blue", label: "Blue", type: "string" },
            { name: "yellow", label: "Yellow", type: "string" },
          ],
        },
        {
          name: "user",
          label: "User",
          type: "object",
          fields: [
            { name: "id", label: "ID", type: "string" },
            { name: "alias", label: "Alias", type: "string" },
            { name: "type", label: "Type", type: "string" },
          ],
        },
      ],
    },
  ],
};

