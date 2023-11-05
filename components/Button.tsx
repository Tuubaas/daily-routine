import type { LinkProps } from 'next/link';
import Link from 'next/link';

type BaseProps = {
  children: React.ReactNode;
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
  const classNames =
    'flex justify-center items-center text-white p-4 rounded-full hover:underline hover:underline-offset-4';

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
