export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground mt-1">Manage your platform configuration.</p>
      </div>
      <div className="border border-border p-6 mt-4">
        <p className="text-sm text-muted-foreground">Settings configuration is currently handled via environmental variables.</p>
      </div>
    </div>
  );
}
