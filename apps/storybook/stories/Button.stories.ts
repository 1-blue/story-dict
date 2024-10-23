import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "@sd/ui";

const meta = {
  title: "Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    children: { control: "text", defaultValue: "Button" },
    variant: { control: "select" },
    onClick: { action: "clicked", type: "function" },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "default",
    children: "Button",
  },
};
