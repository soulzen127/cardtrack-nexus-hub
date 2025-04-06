
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShieldAlert } from "lucide-react";
import { useI18n } from "@/hooks/use-i18n";

interface AlertConfig {
  id: number;
  name: string;
  description: string;
  channels: string[];
  enabled: boolean;
}

interface AlertSettingsListProps {
  configurations: AlertConfig[];
}

export function AlertSettingsList({ configurations }: AlertSettingsListProps) {
  const { t } = useI18n();

  return (
    <div className="space-y-4">
      {configurations.map((config) => (
        <Card key={config.id}>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center">
                  <ShieldAlert className="h-5 w-5 mr-2 text-primary" />
                  <h3 className="font-medium">{config.name}</h3>
                  {config.enabled ? (
                    <Badge className="ml-2 bg-cardtrack-green/10 text-cardtrack-green">{t("enabled")}</Badge>
                  ) : (
                    <Badge className="ml-2 bg-muted text-muted-foreground">{t("disabled")}</Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{config.description}</p>
                <div className="flex items-center mt-1">
                  <span className="text-xs mr-2">{t("channels")}:</span>
                  <div className="flex flex-wrap gap-1">
                    {config.channels.map((channel, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {channel}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  {t("edit")}
                </Button>
                {config.enabled ? (
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-cardtrack-red border-cardtrack-red/20 hover:bg-cardtrack-red/10"
                  >
                    {t("disable")}
                  </Button>
                ) : (
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-cardtrack-green border-cardtrack-green/20 hover:bg-cardtrack-green/10"
                  >
                    {t("enable")}
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
