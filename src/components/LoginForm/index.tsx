import { useToggle, upperFirst } from '@mantine/hooks'
import { useForm } from '@mantine/form'
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
} from '@mantine/core'
import { GoogleButton } from './/GoogleButton'
import { TwitterButton } from './TwitterButton'
import { useMutation } from '@tanstack/react-query'
import { Signup, UserLogin } from '../../service/AuthService'
import { notifications } from '@mantine/notifications'

export function AuthenticationForm(props: PaperProps) {
  const { mutate: login, isPending: isLogging } = useMutation({
    mutationFn: UserLogin,
    onSuccess: (_, variables) => {
      notifications.show({
        message: `${variables.username} Logged in `,
        color: 'green',
      })
    },
    onError: (error) => {
      notifications.show({
        title: error.message,
        message: `Login Failed`,
        color: 'red',
      })
    },
  })

  const { mutate: signup, isPending: isSigning } = useMutation({
    mutationFn: Signup,
    onSuccess: (_, variables) => {
      notifications.show({
        message: `${variables.username} Signed in `,
        color: 'green',
      })
    },
    onError: (error) => {
      notifications.show({
        title: error.message,
        message: `Signup Failed`,
        color: 'red',
      })
    },
  })

  const [type, toggle] = useToggle(['login', 'register'])
  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      terms: true,
    },

    validate: {
      // email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) =>
        val.length <= 4
          ? 'Password should include at least 4 characters'
          : null,
    },
  })

  return (
    <Paper radius="md" p="xl" withBorder {...props}>
      <Text size="lg" fw={500}>
        Welcome to Mantine, {type} with
      </Text>

      <Group grow mb="md" mt="md">
        <GoogleButton radius="xl">Google</GoogleButton>
        <TwitterButton radius="xl">Twitter</TwitterButton>
      </Group>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />

      <form
        onSubmit={form.onSubmit(() => {
          if (type === 'request') {
            login({
              password: form.values.password,
              username: form.values.name,
            })
          } else {
            signup({
              email: form.values.email,
              password: form.values.password,
              username: form.values.name,
            })
          }
        })}
      >
        <Stack>
          <TextInput
            required
            label="Name"
            placeholder="Your name"
            value={form.values.name}
            onChange={(event) =>
              form.setFieldValue('name', event.currentTarget.value)
            }
            radius="md"
          />

          {type === 'register' && (
            <TextInput
              required
              label="Email"
              placeholder="hello@mantine.dev"
              value={form.values.email}
              onChange={(event) =>
                form.setFieldValue('email', event.currentTarget.value)
              }
              error={form.errors.email && 'Invalid email'}
              radius="md"
            />
          )}

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) =>
              form.setFieldValue('password', event.currentTarget.value)
            }
            error={
              form.errors.password &&
              'Password should include at least 6 characters'
            }
            radius="md"
          />

          {type === 'register' && (
            <Checkbox
              label="I accept terms and conditions"
              checked={form.values.terms}
              onChange={(event) =>
                form.setFieldValue('terms', event.currentTarget.checked)
              }
            />
          )}
        </Stack>

        <Group justify="space-between" mt="xl">
          <Anchor
            component="button"
            type="button"
            c="dimmed"
            onClick={() => toggle()}
            size="xs"
          >
            {type === 'register'
              ? 'Already have an account? Login'
              : "Don't have an account? Register"}
          </Anchor>
          <Button type="submit" radius="xl" loading={isLogging || isSigning}>
            {upperFirst(type)}
          </Button>
        </Group>
      </form>
    </Paper>
  )
}
