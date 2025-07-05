import React, { useState, useEffect, useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

// Import Vromm Design System components
import { Title, Text } from '@vromm/design-system';
import '@vromm/design-system/dist/styles.css'; // Import the CSS

import { useAuth } from '@/contexts/AuthContext';
import { useMapContext } from '@/contexts/MapContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { analytics } from '@/services/analyticsService';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from '@/components/ui/carousel';
import { DatePicker } from '@/components/ui/date-picker';
import { MultiSelect } from '@/components/ui/multi-select';
import ReportDialog from './ReportDialog';
import { CountrySelect } from '@/components/ui/country-select';
import MapPreview from './MapPreview';
import { ShareButton } from '@/components/ShareButton';
import { useUrlState } from '@/hooks/useUrlState';
import { PublicProfileDialog } from '@/components/dialogs/PublicProfileDialog';
import { 
  MapPin, 
  Edit3, 
  Save, 
  X, 
  Star, 
  Heart, 
  Flag, 
  Play, 
  Calendar,
  Clock,
  User,
  Route as RouteIcon,
  ExternalLink,
  MapIcon,
  Car,
  Settings,
  Eye,
  EyeOff,
  Shield,
  Building,
  Image as ImageIcon,
  Video,
  Trash2,
  AlertCircle,
  Youtube,
} from 'lucide-react';

interface RouteDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  route: any;
  onRouteUpdate?: (updatedRoute: any) => void;
  onRouteDelete?: (routeId: string) => void;
}

const RouteDetailModal = ({ isOpen, onClose, route, onRouteUpdate, onRouteDelete }: RouteDetailModalProps) => {
  console.log('Available route data in modal (initial prop):', route);
  const { user } = useAuth();
  const { mapboxToken } = useMapContext();
  const { generateShareUrl, setUrlParam, removeUrlParam, getUrlParam } = useUrlState();
  const [isEditing, setIsEditing] = useState(false);
  const [editedRoute, setEditedRoute] = useState(route || {});
  const [isSaving, setIsSaving] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [isSaved, setIsSaved] = useState(false);
  const [isDriven, setIsDriven] = useState(false);
  const [creatorProfile, setCreatorProfile] = useState<any>(null);
  const [displayRoute, setDisplayRoute] = useState<any>(route || {});
  const [mediaToDelete, setMediaToDelete] = useState<any>(null);
  const [isDeleteRouteDialogOpen, setIsDeleteRouteDialogOpen] = useState(false);
  const [isDeletingRoute, setIsDeletingRoute] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [isPublicProfileDialogOpen, setIsPublicProfileDialogOpen] = useState(false);
  const [publicProfileData, setPublicProfileData] = useState<any>(null);

  // ... (rest of your existing component logic)

  if (!displayRoute) return null;

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                {isEditing ? (
                  <Input
                    value={editedRoute.name || ''}
                    onChange={(e) => setEditedRoute({...editedRoute, name: e.target.value})}
                    className="text-lg font-semibold"
                  />
                ) : (
                  // Replace with Vromm Design System Title component
                  <Title level={1} size="2xl" weight="semibold" variant="primary">
                    {displayRoute.name}
                  </Title>
                )}
              </div>
              {/* ... existing buttons */}
            </DialogTitle>
            <DialogDescription>
              {/* Replace with Vromm Design System Text component */}
              <Text size="base" variant="secondary">
                Route details for {displayRoute.name}
              </Text>
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Creator and Timestamps */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
              <div>
                {/* Replace label with Vromm Text component */}
                <Text size="sm" weight="medium" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Created by
                </Text>
                <Text 
                  size="sm" 
                  variant="secondary" 
                  className="mt-1 underline cursor-pointer hover:text-primary"
                  onClick={handleCreatorNameClick}
                >
                  {creatorProfile?.full_name || 'Unknown'}
                </Text>
              </div>
              <div>
                <Text size="sm" weight="medium" className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Created
                </Text>
                {isEditing ? (
                    <DatePicker 
                      date={editedRoute.created_at} 
                      setDate={(date) => setEditedRoute({ ...editedRoute, created_at: date || new Date()})}
                    />
                ) : (
                  <Text size="sm" variant="secondary" className="mt-1">
                    {new Date(displayRoute.created_at).toLocaleDateString()} {new Date(displayRoute.created_at).toLocaleTimeString()}
                  </Text>
                )}
              </div>
              {displayRoute.updated_at !== displayRoute.created_at && (
                <div>
                  <Text size="sm" weight="medium">Last Updated</Text>
                  <Text size="sm" variant="secondary" className="mt-1">
                    {new Date(displayRoute.updated_at).toLocaleDateString()} {new Date(displayRoute.updated_at).toLocaleTimeString()}
                  </Text>
                </div>
              )}
              <div>
                <Text size="sm" weight="medium">Route ID</Text>
                <Text size="xs" variant="secondary" className="mt-1 font-mono">
                  {displayRoute.id}
                </Text>
              </div>
            </div>

            {/* Map Preview */}
            <div>
              <Title level={4} size="base" weight="medium" className="mb-3 flex items-center gap-2">
                <MapIcon className="w-4 h-4" />
                Map Preview
              </Title>
              <MapPreview 
                route={displayRoute}
                waypointDetails={displayRoute.waypoint_details}
                className="w-full"
              />
            </div>

            {/* Basic Route Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <Text size="sm" weight="medium">Description</Text>
                  {isEditing ? (
                    <Textarea
                      value={editedRoute.description || ''}
                      onChange={(e) => setEditedRoute({...editedRoute, description: e.target.value})}
                      rows={3}
                    />
                  ) : (
                    <Text size="sm" variant="secondary" className="mt-1">
                      {displayRoute.description || 'No description'}
                    </Text>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Text size="sm" weight="medium">Difficulty</Text>
                    {isEditing ? (
                      <Select
                        value={editedRoute.difficulty || ''}
                        onValueChange={(value) => setEditedRoute({...editedRoute, difficulty: value})}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <Badge variant="outline" className="capitalize mt-1">
                        {displayRoute.difficulty}
                      </Badge>
                    )}
                  </div>

                  <div>
                    <Text size="sm" weight="medium">Activity Level</Text>
                    {isEditing ? (
                      <Select
                        value={editedRoute.activity_level || ''}
                        onValueChange={(value) => setEditedRoute({...editedRoute, activity_level: value})}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="moderate">Moderate</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <Badge variant="secondary" className="capitalize mt-1">
                        {displayRoute.activity_level}
                      </Badge>
                    )}
                  </div>
                </div>

                <div>
                  <Text size="sm" weight="medium">Best Times</Text>
                  {isEditing ? (
                    <Select
                      value={editedRoute.best_times || ''}
                      onValueChange={(value) => setEditedRoute({...editedRoute, best_times: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select best times..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="morning">Morning (6am - 12pm)</SelectItem>
                        <SelectItem value="afternoon">Afternoon (12pm - 5pm)</SelectItem>
                        <SelectItem value="evening">Evening (5pm - 9pm)</SelectItem>
                        <SelectItem value="night">Night (9pm - 6am)</SelectItem>
                        <SelectItem value="anytime">Anytime</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <Text size="sm" variant="secondary" className="mt-1 capitalize">
                      {displayRoute.best_times?.replace('_', ' ') || 'Anytime'}
                    </Text>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Text size="sm" weight="medium">
                    {displayRoute.drawing_mode === 'record' || (displayRoute.waypoint_details && displayRoute.waypoint_details.length > 1) ? 'Route Area' : 'City'}
                  </Text>
                  {isEditing ? (
                    <Input
                      value={editedRoute.location || ''}
                      onChange={(e) => setEditedRoute({...editedRoute, location: e.target.value})}
                      placeholder="e.g., City"
                    />
                  ) : (
                    <Text size="sm" variant="secondary" className="mt-1">
                      {displayRoute.location || 'No city specified'}
                    </Text>
                  )}
                </div>

                {/* Recording Statistics */}
                {displayRoute.drawing_mode === 'record' && (displayRoute.metadata?.recording_stats || displayRoute.description?.includes('Distance:')) && (
                  <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                    <Title level={5} size="base" weight="medium" variant="primary" className="mb-2 flex items-center gap-2">
                      <RouteIcon className="w-4 h-4" />
                      Recording Statistics
                    </Title>
                    <div className="space-y-1">
                      {displayRoute.metadata?.recording_stats ? (
                        <>
                          <div className="flex justify-between items-center">
                            <Text size="sm" variant="primary">Distance:</Text>
                            <Text size="sm" weight="medium" variant="primary">
                              {displayRoute.metadata.recording_stats.distance_km?.toFixed(2)} km
                            </Text>
                          </div>
                          <div className="flex justify-between items-center">
                            <Text size="sm" variant="primary">Driving Time:</Text>
                            <Text size="sm" weight="medium" variant="primary">
                              {Math.floor(displayRoute.metadata.recording_stats.driving_time_seconds / 60)}:{(displayRoute.metadata.recording_stats.driving_time_seconds % 60).toString().padStart(2, '0')}
                            </Text>
                          </div>
                          <div className="flex justify-between items-center">
                            <Text size="sm" variant="primary">Max Speed:</Text>
                            <Text size="sm" weight="medium" variant="primary">
                              {displayRoute.metadata.recording_stats.max_speed_kmh?.toFixed(1)} km/h
                            </Text>
                          </div>
                          <div className="flex justify-between items-center">
                            <Text size="sm" variant="primary">Avg Speed:</Text>
                            <Text size="sm" weight="medium" variant="primary">
                              {displayRoute.metadata.recording_stats.avg_speed_kmh?.toFixed(1)} km/h
                            </Text>
                          </div>
                          <div className="flex justify-between items-center">
                            <Text size="sm" variant="primary">Waypoints:</Text>
                            <Text size="sm" weight="medium" variant="primary">
                              {displayRoute.waypoint_details?.length || 0}
                            </Text>
                          </div>
                        </>
                      ) : (
                        displayRoute.description.split(', ').map((stat: string, index: number) => (
                          <div key={index} className="flex justify-between items-center">
                            <Text size="sm" variant="primary">{stat.split(': ')[0]}:</Text>
                            <Text size="sm" weight="medium" variant="primary">{stat.split(': ')[1]}</Text>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Route Classification */}
            <div>
              <Title level={4} size="base" weight="medium" className="mb-3 flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Route Classification
              </Title>
              {/* ... rest of classification content with Text components */}
            </div>

            {/* ... Continue replacing other text elements with Vromm Design System components ... */}
          </div>
        </DialogContent>
      </Dialog>
      
      <PublicProfileDialog
        userId={publicProfileData?.id || ''}
        isOpen={isPublicProfileDialogOpen}
        onClose={() => setIsPublicProfileDialogOpen(false)}
      />
    </>
  );
};

export default RouteDetailModal; 