import { Platform } from 'react-native';
import { Pressable } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { type ComponentProps } from 'react';

type WebProps = ComponentProps<'a'> & {
  href: string;
  children?: React.ReactNode;
};

type NativeProps = Omit<ComponentProps<typeof Pressable>, 'onPress'> & {
  href: string;
  children?: React.ReactNode;
};

export function ExternalLink({
  href,
  children,
  ...webProps
}: WebProps & NativeProps) {
  if (Platform.OS === 'web') {
    const { onPress, ...rest } = webProps as unknown as WebProps;
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        {...rest}
      >
        {children}
      </a>
    );
  }

  const { onPress, ...rest } = webProps as unknown as NativeProps;
  return (
    <Pressable
      onPress={async () => {
        await WebBrowser.openBrowserAsync(href);
      }}
      {...rest}
    >
      {children}
    </Pressable>
  );
}
