import type { LinkProps } from 'next/link';
import Link from 'next/link';

type BaseProps = {
  children: React.ReactNode;
  rounded?: boolean;
  className?: never;
};

type AsButtonProps = BaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    as?: 'button';
  };

type AsLinkProps = BaseProps &
  LinkProps & {
    as: 'link';
  };

type AsExternalLink = BaseProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    as: 'external';
  };

type Props = AsButtonProps | AsLinkProps | AsExternalLink;

function Button(props: Props) {
  const classNames = `flex justify-center items-center bg-secondary text-white text-xl rounded-full min-w-1/2 shadow-lg hover:bg-secondary/90 ${
    props.rounded ? '' : 'p-4'
  }`;

  if (props.as === 'link') {
    const { as, children, ...rest } = props;
    return (
      <Link className={classNames} {...rest}>
        {children}
      </Link>
    );
  } else if (props.as === 'external') {
    const { as, children, ...rest } = props;
    return (
      <a className={classNames} {...rest}>
        {children}
      </a>
    );
  } else {
    const { as, children, ...rest } = props;
    return (
      <button className={classNames} {...rest}>
        {children}
      </button>
    );
  }
}

export default Button;
