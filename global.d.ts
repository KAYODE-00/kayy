declare namespace JSX {
  interface IntrinsicElements {
    marquee: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    > & {
      direction?: string;
      behavior?: string;
      scrollamount?: string;
    };
  }
}