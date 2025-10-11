import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Icons } from '@/components/shared/icons';

interface UserAvatarProps {
  name: string;
  image: string;
}

export function UserAvatar({ name, image }: UserAvatarProps) {
  return (
    <Avatar className="size-7 rounded-full">
      {image ? (
        <AvatarImage alt="Picture" src={image} referrerPolicy="no-referrer" />
      ) : (
        <AvatarFallback>
          <span className="sr-only">{name}</span>
          <Icons.user className="size-4" />
        </AvatarFallback>
      )}
    </Avatar>
  );
}
