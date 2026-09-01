# $mol_notify

Manages system notifications. Notifications of same context are auto joined to one notification.

## Usage example

```typescript
// Request permissions if required
$mol_notify.allowed( true )

// Show notification
$mol_notify.show({
	context: "Jin's profile",
	message: "Sex is changed to Male",
	uri: 'https://example.org/#profile=1234',
})

$mol_notify.show({
	context: "Jin's profile",
	message: "Sex is changed to Required",
	uri: 'https://example.org/#profile=1234',
})
```

> **Jin's profile**
>
> Sex is changed to Male
>
> Sex is changed to Required
