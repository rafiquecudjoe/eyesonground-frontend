import { useState } from "react";
import { DollarSign, TrendingUp, Calendar, Download, Eye, Clock, Star, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, LineChart, Line } from "recharts";

export const Earnings = () => {
  const [timeFilter, setTimeFilter] = useState("this-month");

  // Mock earnings data
  const earningsData = [
    { month: "Aug", earnings: 850 },
    { month: "Sep", earnings: 1200 },
    { month: "Oct", earnings: 980 },
    { month: "Nov", earnings: 1450 },
    { month: "Dec", earnings: 1680 }
  ];

  const recentPayments = [
    {
      id: 1,
      client: "Sarah Johnson",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
      service: "Vehicle Inspection",
      amount: "$135.00",
      date: "Dec 16, 2024",
      status: "paid",
      rating: 5
    },
    {
      id: 2,
      client: "Michael Chen", 
      avatar: "https://randomuser.me/api/portraits/men/55.jpg",
      service: "Property Assessment",
      amount: "$315.00",
      date: "Dec 12, 2024",
      status: "paid",
      rating: 4
    },
    {
      id: 3,
      client: "David Rodriguez",
      avatar: "https://randomuser.me/api/portraits/men/65.jpg",
      service: "Electronics Verification",
      amount: "$76.50",
      date: "Dec 6, 2024",
      status: "paid",
      rating: 5
    }
  ];

  const totalEarnings = recentPayments.reduce((sum, payment) => sum + parseFloat(payment.amount.replace('$', '')), 0);
  const averageRating = recentPayments.reduce((sum, payment) => sum + payment.rating, 0) / recentPayments.length;

  return (
    <div className="container mx-auto px-4 md:px-6 py-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] rounded-xl flex items-center justify-center shadow-lg">
            <Target className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[rgba(13,38,75,1)]">Earnings Dashboard</h1>
            <p className="text-[rgba(13,38,75,0.7)]">Track your income and payment history</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-r from-[rgba(42,100,186,0.1)] to-[rgba(13,38,75,0.1)] border-[rgba(42,100,186,0.2)]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[rgba(13,38,75,0.7)]">Total Earnings</p>
                <p className="text-2xl font-bold text-[rgba(13,38,75,1)]">${totalEarnings.toFixed(2)}</p>
                <p className="text-xs text-green-600 mt-1">+12% this month</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] rounded-xl flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-700">Available Balance</p>
                <p className="text-2xl font-bold text-green-800">$1,247.50</p>
                <p className="text-xs text-green-600 mt-1">Ready to withdraw</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-700">Avg. Rating</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold text-blue-800">{averageRating.toFixed(1)}</p>
                  <Star className="h-5 w-5 text-yellow-500 fill-current" />
                </div>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <Star className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-violet-50 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-700">Jobs Completed</p>
                <p className="text-2xl font-bold text-purple-800">{recentPayments.length}</p>
                <p className="text-xs text-purple-600 mt-1">This month</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center">
                <Target className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Earnings Chart */}
      <Card className="bg-white/80 backdrop-blur-sm border-[rgba(42,100,186,0.1)] mb-8">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-[rgba(13,38,75,1)]">Earnings Overview</CardTitle>
            <p className="text-sm text-[rgba(13,38,75,0.7)]">Your monthly earnings trend</p>
          </div>
          <Select value={timeFilter} onValueChange={setTimeFilter}>
            <SelectTrigger className="w-40 rounded-xl border-[rgba(42,100,186,0.2)]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="this-month">This Month</SelectItem>
              <SelectItem value="last-3-months">Last 3 Months</SelectItem>
              <SelectItem value="last-6-months">Last 6 Months</SelectItem>
              <SelectItem value="this-year">This Year</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{
            earnings: {
              label: "Earnings",
              color: "rgba(42,100,186,1)",
            },
          }} className="h-80">
            <BarChart data={earningsData}>
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="earnings" fill="url(#gradient)" radius={8} />
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(42,100,186,1)" />
                  <stop offset="100%" stopColor="rgba(13,38,75,1)" />
                </linearGradient>
              </defs>
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Recent Payments */}
      <Card className="bg-white/80 backdrop-blur-sm border-[rgba(42,100,186,0.1)]">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-[rgba(13,38,75,1)]">Recent Payments</CardTitle>
            <p className="text-sm text-[rgba(13,38,75,0.7)]">Your latest completed jobs and payments</p>
          </div>
          <Button variant="outline" className="border-[rgba(42,100,186,0.3)] hover:bg-[rgba(42,100,186,0.1)]">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentPayments.map((payment) => (
              <div key={payment.id} className="flex items-center justify-between p-4 border border-[rgba(42,100,186,0.1)] rounded-xl bg-white/60 hover:bg-white/80 transition-colors">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12 border-2 border-white shadow-md">
                    <AvatarImage src={payment.avatar} />
                    <AvatarFallback className="bg-gradient-to-br from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] text-white">
                      {payment.client.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <p className="font-semibold text-[rgba(13,38,75,1)]">{payment.service}</p>
                    <p className="text-sm text-[rgba(13,38,75,0.7)]">Client: {payment.client}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3 h-3 ${i < payment.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                        ))}
                      </div>
                      <span className="text-xs text-[rgba(13,38,75,0.7)]">({payment.rating}/5)</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-lg font-bold text-[rgba(13,38,75,1)]">{payment.amount}</p>
                  <p className="text-sm text-[rgba(13,38,75,0.7)]">{payment.date}</p>
                  <Badge className="bg-green-100 text-green-800 mt-1">
                    {payment.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};