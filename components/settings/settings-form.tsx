"use client";

import { useActionState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { updatePassword, type AuthActionState } from "@/app/(auth)/actions";
import {
  updateProfile,
  updatePreferences,
  type SettingsActionState,
} from "@/app/(app)/settings/actions";

type Profile = {
  full_name: string | null;
  default_followup_days: number;
  timezone: string;
  date_format: string;
};

export function SettingsForm({ email, profile }: { email: string; profile: Profile }) {
  const [profileState, profileAction, profilePending] = useActionState<
    SettingsActionState,
    FormData
  >(updateProfile, null);
  const [passwordState, passwordAction, passwordPending] = useActionState<
    AuthActionState,
    FormData
  >(updatePassword, null);
  const [prefsState, prefsAction, prefsPending] = useActionState<
    SettingsActionState,
    FormData
  >(updatePreferences, null);

  return (
    <Tabs defaultValue="profile">
      <TabsList>
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="preferences">Preferences</TabsTrigger>
      </TabsList>

      <TabsContent value="profile">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Profile</CardTitle>
          </CardHeader>
          <form action={profileAction}>
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="fullName">Full name</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  placeholder="Your name"
                  defaultValue={profile.full_name ?? ""}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" disabled value={email} />
                <p className="text-xs text-muted-foreground">
                  Your email is managed by Supabase Auth and set when you sign up.
                </p>
              </div>
              {profileState?.error && (
                <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  {profileState.error}
                </p>
              )}
              {profileState?.success && (
                <p className="rounded-md bg-success/10 px-3 py-2 text-sm text-success">
                  Profile saved.
                </p>
              )}
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={profilePending}>
                {profilePending ? "Saving…" : "Save Profile"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </TabsContent>

      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Password</CardTitle>
          </CardHeader>
          <form action={passwordAction}>
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="password">New password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="At least 8 characters"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="confirmPassword">Confirm new password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  placeholder="••••••••"
                />
              </div>
              {passwordState?.error && (
                <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  {passwordState.error}
                </p>
              )}
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={passwordPending}>
                {passwordPending ? "Updating…" : "Update Password"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </TabsContent>

      <TabsContent value="preferences">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Follow-up preferences</CardTitle>
          </CardHeader>
          <form action={prefsAction}>
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="defaultFollowupDays">Default follow-up period</Label>
                <Select
                  name="defaultFollowupDays"
                  defaultValue={String(profile.default_followup_days)}
                >
                  <SelectTrigger className="w-48" id="defaultFollowupDays">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 day</SelectItem>
                    <SelectItem value="2">2 days</SelectItem>
                    <SelectItem value="3">3 days</SelectItem>
                    <SelectItem value="5">5 days</SelectItem>
                    <SelectItem value="7">7 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-1.5">
                <Label>Timezone</Label>
                <Select name="timezone" defaultValue={profile.timezone}>
                  <SelectTrigger className="w-64">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Asia/Kolkata">Asia/Kolkata</SelectItem>
                    <SelectItem value="UTC">UTC</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-1.5">
                <Label>Date format</Label>
                <Select name="dateFormat" defaultValue={profile.date_format}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                    <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                    <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {prefsState?.error && (
                <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  {prefsState.error}
                </p>
              )}
              {prefsState?.success && (
                <p className="rounded-md bg-success/10 px-3 py-2 text-sm text-success">
                  Preferences saved.
                </p>
              )}
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={prefsPending}>
                {prefsPending ? "Saving…" : "Save Preferences"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
