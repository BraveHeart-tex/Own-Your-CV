'use client';
import { observer } from 'mobx-react-lite';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import userSettingsStore from '@/lib/stores/userSettingsStore';
import UserSettingsService from '@/lib/client-db/userSettingsService';
import { useNetworkState } from 'react-use';

const EditorPreferences = observer(() => {
  const { online } = useNetworkState();
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Editor Preferences</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="askBeforeDeletingItem">
            Ask before deleting an item
          </Label>
          <Switch
            id="askBeforeDeletingItem"
            checked={userSettingsStore.editorPreferences.askBeforeDeletingItem}
            onCheckedChange={(checked) =>
              UserSettingsService.handleEditorPreferenceChange(
                'askBeforeDeletingItem',
                checked,
              )
            }
          />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="askBeforeDeletingSection">
            Ask before deleting a section
          </Label>
          <Switch
            id="askBeforeDeletingSection"
            checked={
              userSettingsStore.editorPreferences.askBeforeDeletingSection
            }
            onCheckedChange={(checked) =>
              UserSettingsService.handleEditorPreferenceChange(
                'askBeforeDeletingSection',
                checked,
              )
            }
          />
        </div>
        {online ? (
          <div className="flex items-center justify-between">
            <Label htmlFor="showAiSuggestions">
              Show AI suggestions (requires sign in)
            </Label>
            <Switch
              id="showAiSuggestions"
              checked={userSettingsStore.editorPreferences.showAiSuggestions}
              onCheckedChange={(checked) =>
                UserSettingsService.handleEditorPreferenceChange(
                  'showAiSuggestions',
                  checked,
                )
              }
            />
          </div>
        ) : null}
      </div>
    </div>
  );
});

export default EditorPreferences;
