import { Button } from "@/components/ui/button";
import { Download, ArrowRight, Upload, CheckCircle } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function DownloadsPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploaded, setIsUploaded] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setIsUploaded(false);
      setUploadProgress(0);
    }
  };

  const handleUpload = () => {
    if (!file) return;
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploaded(true);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500 mb-4">
          Downloads
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Get the latest mods and game files directly from our servers
        </p>
      </div>

      {/* Crick Fusion Section */}
      <section className="mb-20">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-4 md:mb-0">
            Crick Fusion
          </h2>
          <div className="flex gap-4">
            <Button variant="outline" asChild>
              <Link href="#changelog">
                View Changelog <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild>
              <Link href="/crick-fusion-docs">
                Documentation <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-gradient-to-br from-primary/10 to-background border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="text-primary" /> Current Version
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Version</span>
                  <span className="font-mono">v2.5.1</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Release Date</span>
                  <span>June 15, 2024</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">File Size</span>
                  <span>1.2 GB</span>
                </div>
                <Button className="w-full mt-4" size="lg" asChild>
                  <Link href="/downloads/crick-fusion-v2.5.1.zip">
                    Download Now <Download className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-secondary/10 to-background border-secondary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="text-secondary" /> Upload Your Mod
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Input 
                    type="file" 
                    onChange={handleFileChange}
                    accept=".zip,.rar,.7z"
                  />
                  <p className="text-sm text-muted-foreground">
                    Upload .zip, .rar, or .7z files (max 2GB)
                  </p>
                </div>
                
                {file && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{file.name}</span>
                      <span>{(file.size / (1024 * 1024)).toFixed(2)} MB</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-primary h-2.5 rounded-full" 
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                <Button 
                  className="w-full" 
                  size="lg" 
                  onClick={handleUpload}
                  disabled={!file || isUploaded}
                >
                  {isUploaded ? (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" /> Upload Complete
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" /> Upload Mod
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Additional Downloads Section */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-foreground mb-8">Other Mods</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: "Shiva X Graphics Pack",
              version: "v1.3.2",
              size: "850 MB",
              url: "/downloads/shiva-graphics-v1.3.2.zip"
            },
            {
              name: "Crick Fusion X",
              version: "v1.0.0",
              size: "950 MB",
              url: "/downloads/crick-fusion-x-v1.0.0.zip"
            },
            {
              name: "Stadium Pack",
              version: "v2.1.4",
              size: "1.5 GB",
              url: "/downloads/stadium-pack-v2.1.4.zip"
            }
          ].map((mod, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{mod.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between mb-2">
                  <span className="text-muted-foreground">Version</span>
                  <span>{mod.version}</span>
                </div>
                <div className="flex justify-between mb-4">
                  <span className="text-muted-foreground">Size</span>
                  <span>{mod.size}</span>
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <Link href={mod.url}>
                    Download <Download className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Changelog Section */}
      <section id="changelog" className="mb-20">
        <h2 className="text-3xl font-bold text-foreground mb-8">Crick Fusion Changelog</h2>
        <div className="bg-muted/50 rounded-lg p-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Version 2.5.1</h3>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                <li>Added 5 new stadiums</li>
                <li>Improved physics for better ball dynamics</li>
                <li>Fixed multiplayer connection issues</li>
                <li>Updated player roster with 2024 teams</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Version 2.4.0</h3>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                <li>Added new batting animations</li>
                <li>Improved AI fielding logic</li>
                <li>Fixed crash on Windows 11</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="text-center py-12 bg-gradient-to-br from-primary/10 to-background rounded-xl">
        <h2 className="text-2xl font-bold mb-4">Need Help With Installation?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
          Join our Discord community for support, or check out our detailed installation guide.
        </p>
        <div className="flex gap-4 justify-center">
          <Button variant="outline" asChild>
            <Link href="/installation-guide">
              View Guide <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild>
            <Link href="https://discord.gg/shivaxmods">
              Join Discord <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
