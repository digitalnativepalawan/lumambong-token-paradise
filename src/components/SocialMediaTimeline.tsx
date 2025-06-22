
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Target, BarChart3, Rocket, TrendingUp } from 'lucide-react';

const SocialMediaTimeline = () => {
  const timelineData = {
    prelaunch: [
      {
        phase: "Legal Education",
        timeline: "Monthly Content",
        activities: "Share infographics explaining 60/40 model, SEC compliance, tokenization transparency",
        responsible: "Legal Advisor, Content Writer"
      },
      {
        phase: "Lifestyle Showcases",
        timeline: "Monthly",
        activities: "Post 'Behind the Scenes', 'Before & After', and lifestyle vignettes featuring off-grid life",
        responsible: "Videographer, Editor, Storyteller"
      },
      {
        phase: "Live Engagement",
        timeline: "Weekly",
        activities: "Host Instagram Lives / Twitter Spaces with founders/architects/legal. Run Instagram Story quizzes and polls",
        responsible: "Marketing Team, Founders"
      },
      {
        phase: "Investor Targeting",
        timeline: "Ongoing",
        activities: "ESG content on LinkedIn, Crypto threads/Reels, WeChat ads and Mandarin/Korean video tours",
        responsible: "Marketing Team"
      },
      {
        phase: "Community Building",
        timeline: "Ongoing",
        activities: "Share UGC, repost testimonials/unboxings, Create hashtag campaigns (#LumambongLiving, etc.)",
        responsible: "Community Manager"
      },
      {
        phase: "Email & DM Follow-Up",
        timeline: "Ongoing",
        activities: "Personalized messages to new leads, Share gated content, guides, and private tour invites",
        responsible: "CRM/Email Team"
      },
      {
        phase: "Partnership Amplification",
        timeline: "Monthly",
        activities: "Work with eco-influencers, crypto leaders, travel bloggers for cross-promotion",
        responsible: "Marketing Team"
      },
      {
        phase: "Analytics & Optimization",
        timeline: "Monthly Reviews",
        activities: "Track KPIs: Follower growth, CTR, leads, conversions. Refine strategy based on high-performing content",
        responsible: "Analytics Lead"
      }
    ],
    launch: [
      {
        phase: "Campaign Strategy Finalized",
        timeline: "June 2025",
        activities: "Complete marketing plan and CTA matrix, Finalize KPIs, reporting structure",
        responsible: "Marketing Team, Founders"
      },
      {
        phase: "Visual Content Previews",
        timeline: "Nov 26-28, 2024",
        activities: "Capture drone imagery for promotional use",
        responsible: "Drone Team"
      },
      {
        phase: "Official Launch",
        timeline: "July 1, 2025",
        activities: "Begin marketing campaign, Announce token sale and unit availability",
        responsible: "Founders, Marketing Team"
      },
      {
        phase: "First Content Wave",
        timeline: "July 1-7, 2025",
        activities: "Post drone tours, walkthroughs, explainers. Launch Instagram Reels and carousel posts with CTAs",
        responsible: "Social Media Team"
      },
      {
        phase: "Engagement Cadence Begins",
        timeline: "July 1 onward",
        activities: "Daily DM and comment replies, Prompt FAQ responses via Stories/Threads",
        responsible: "Community Manager, Founders (Q&As)"
      }
    ],
    growth: [
      {
        phase: "Content Publishing",
        timeline: "Weekly",
        activities: "3-4 native posts/Reels per platform per week. Tailored for IG, X, LinkedIn, WeChat",
        responsible: "Social Media Team"
      }
    ]
  };

  const PhaseSection = ({ title, icon: Icon, data, color }: any) => (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon className={`w-5 h-5 ${color}`} />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((item: any, index: number) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Badge variant="outline" className="mb-2">{item.phase}</Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Timeline</p>
                  <p className="text-sm">{item.timeline}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Key Activities</p>
                  <p className="text-sm">{item.activities}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Responsible Parties</p>
                  <p className="text-sm">{item.responsible}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Lumambong Beach Social Media Timeline</h2>
        <p className="text-gray-600">Project marketing strategy and content calendar for team coordination</p>
      </div>

      <PhaseSection 
        title="Pre-Launch: Legal & Setup (May-June 2025)"
        icon={Calendar}
        data={timelineData.prelaunch}
        color="text-blue-600"
      />

      <PhaseSection 
        title="Launch Phase"
        icon={Rocket}
        data={timelineData.launch}
        color="text-green-600"
      />

      <PhaseSection 
        title="Ongoing Growth (6+ Months Post-Launch)"
        icon={TrendingUp}
        data={timelineData.growth}
        color="text-purple-600"
      />

      <Card className="bg-emerald-50 border-emerald-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-emerald-800">
            <BarChart3 className="w-5 h-5" />
            Key Performance Indicators
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white rounded-lg">
              <p className="text-sm font-medium text-gray-600">Follower Growth</p>
              <p className="text-lg font-bold text-emerald-600">Track Monthly</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg">
              <p className="text-sm font-medium text-gray-600">Click-Through Rate</p>
              <p className="text-lg font-bold text-emerald-600">Monitor CTR</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg">
              <p className="text-sm font-medium text-gray-600">Lead Conversions</p>
              <p className="text-lg font-bold text-emerald-600">Weekly Review</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SocialMediaTimeline;
