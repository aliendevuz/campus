import { Button } from './Button';

const meta = {
  title: 'Components/Button', // Storybook menyusidagi joylashuvi
  component: Button,
  tags: ['autodocs'], // Avtomatik dokumentatsiya yaratish
};

export default meta;

// Storybook'da ko'rinadigan turli holatlar (Stories)
export const Primary = {
  args: {
    variant: 'primary',
    label: 'Asosiy tugma',
  },
};

export const Danger = {
  args: {
    variant: 'danger',
    label: 'O‘chirish',
  },
};

export const Large = {
  args: {
    size: 'large',
    label: 'Katta tugma',
  },
};
