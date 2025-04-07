
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Upload, FileUp, Check } from "lucide-react";
import { toast } from "sonner";

export const MapUploader = () => {
  const [file, setFile] = useState<File | null>(null);
  const [mapName, setMapName] = useState("");
  const [mapDescription, setMapDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  
  const handleUpload = () => {
    if (!file) {
      toast.error("Please select a file to upload");
      return;
    }
    
    if (!mapName.trim()) {
      toast.error("Please enter a name for the map");
      return;
    }
    
    // Simulate upload
    setUploading(true);
    
    setTimeout(() => {
      toast.success(`${mapName} uploaded successfully`);
      setUploading(false);
      setFile(null);
      setMapName("");
      setMapDescription("");
    }, 1500);
  };
  
  return (
    <div className="space-y-4">
      <div className="text-center">
        <h4 className="font-medium">Upload Indoor Map</h4>
        <p className="text-sm text-muted-foreground">
          Upload 2D floor plans or 3D models for indoor tracking
        </p>
      </div>
      
      <div className="grid gap-4">
        <div className="space-y-2">
          <Label htmlFor="mapName">Map Name</Label>
          <Input
            id="mapName"
            placeholder="e.g., Office Floor 1"
            value={mapName}
            onChange={(e) => setMapName(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="mapDescription">Description (Optional)</Label>
          <Input
            id="mapDescription"
            placeholder="Brief description of this map"
            value={mapDescription}
            onChange={(e) => setMapDescription(e.target.value)}
          />
        </div>
        
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <div className="w-full max-w-xs">
              <Label htmlFor="mapFile" className="cursor-pointer">
                <div className="border-2 border-dashed border-primary/20 rounded-lg p-6 text-center hover:bg-primary/5 transition-colors">
                  {file ? (
                    <div className="space-y-2">
                      <Check className="h-8 w-8 mx-auto text-primary" />
                      <p className="text-sm font-medium">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <FileUp className="h-8 w-8 mx-auto text-muted-foreground" />
                      <p className="text-sm">
                        Drag and drop or click to upload
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Supports .png, .jpg, .svg for 2D maps<br />
                        Supports .obj, .glb, .gltf for 3D models
                      </p>
                    </div>
                  )}
                </div>
                <Input
                  id="mapFile"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept=".png,.jpg,.jpeg,.svg,.obj,.glb,.gltf"
                />
              </Label>
            </div>
          </CardContent>
        </Card>
        
        <Button 
          onClick={handleUpload} 
          disabled={!file || !mapName || uploading}
          className="w-full"
        >
          {uploading ? (
            <>
              <Upload className="mr-2 h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Upload Map
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
