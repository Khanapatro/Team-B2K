import React, { useState } from 'react';
import { AlertTriangle, Zap, DollarSign, Users, BarChart3, Recycle, Brain, Shield, Wifi, Trash2 } from 'lucide-react';

const SmartWasteIssuesDashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState('technical');

  const issueCategories = {
    technical: {
      title: "Technical Challenges",
      icon: <Brain className="w-6 h-6" />,
      color: "bg-blue-500",
      issues: [
        {
          title: "Classification Accuracy Variability",
          description: "AI systems show accuracy ranging from 72.8% to 99.95%, creating inconsistent performance across different implementations.",
          impact: "High",
          details: "Current neural networks struggle with edge cases, damaged items, and materials with mixed compositions. Lighting conditions and camera quality significantly affect recognition rates."
        },
        {
          title: "Contamination Detection",
          description: "Difficulty in identifying contaminated recyclables that can ruin entire batches of recycled materials.",
          impact: "Critical",
          details: "Food residue, chemical contamination, and mixed materials create classification errors. Even small contamination can make recyclable materials unusable."
        },
        {
          title: "Real-time Processing Limitations",
          description: "High computational requirements for real-time image processing and classification in IoT-enabled smart bins.",
          impact: "Medium",
          details: "Edge computing limitations, network latency, and power constraints affect system responsiveness and accuracy in real-world deployments."
        },
        {
          title: "Sensor Integration Complexity",
          description: "Coordinating multiple sensors (cameras, weight, chemical) for comprehensive waste analysis.",
          impact: "High",
          details: "Different sensor types require complex fusion algorithms, calibration issues, and environmental factors affect sensor performance."
        }
      ]
    },
    operational: {
      title: "Operational Issues",
      icon: <Zap className="w-6 h-6" />,
      color: "bg-orange-500",
      issues: [
        {
          title: "Infrastructure Requirements",
          description: "Need for robust network connectivity, power supply, and maintenance infrastructure for smart waste systems.",
          impact: "Critical",
          details: "Remote locations lack reliable internet, power outages disrupt operations, and specialized maintenance teams are scarce."
        },
        {
          title: "Scale Implementation Challenges",
          description: "Difficulty in deploying smart waste systems across entire cities or regions uniformly.",
          impact: "High",
          details: "Varying local regulations, different waste types across regions, and coordination between multiple stakeholders create deployment complexities."
        },
        {
          title: "Human Behavior Adaptation",
          description: "Users often fail to properly prepare waste items or follow smart system guidelines.",
          impact: "High",
          details: "Inadequate cleaning of containers, incorrect bin usage, and resistance to new technology adoption reduce system effectiveness."
        },
        {
          title: "Maintenance and Downtime",
          description: "Smart systems require regular calibration, cleaning, and technical maintenance.",
          impact: "Medium",
          details: "Camera lenses get dirty, mechanical parts wear out, and software updates can cause temporary system failures."
        }
      ]
    },
    economic: {
      title: "Economic Barriers",
      icon: <DollarSign className="w-6 h-6" />,
      color: "bg-green-500",
      issues: [
        {
          title: "High Initial Investment",
          description: "Smart waste systems require significant upfront costs for hardware, software, and infrastructure.",
          impact: "Critical",
          details: "Advanced sensors, AI processing units, robotic arms, and network infrastructure create high capital requirements that many municipalities cannot afford."
        },
        {
          title: "Return on Investment Uncertainty",
          description: "Unclear economic benefits and long payback periods discourage adoption.",
          impact: "High",
          details: "Benefits like reduced contamination and improved recycling rates are difficult to quantify financially, making business cases challenging."
        },
        {
          title: "Operational Cost Complexity",
          description: "Ongoing costs for data processing, cloud services, maintenance, and energy consumption.",
          impact: "Medium",
          details: "Cloud computing costs for AI processing, regular hardware replacements, and specialized technical support create ongoing financial burden."
        },
        {
          title: "Market Fragmentation",
          description: "Lack of standardized solutions increases costs and reduces economies of scale.",
          impact: "Medium",
          details: "Multiple competing technologies, proprietary systems, and lack of interoperability standards prevent cost optimization."
        }
      ]
    },
    social: {
      title: "Social & Environmental",
      icon: <Users className="w-6 h-6" />,
      color: "bg-purple-500",
      issues: [
        {
          title: "Digital Divide",
          description: "Unequal access to smart waste technologies across different socioeconomic communities.",
          impact: "High",
          details: "Wealthy neighborhoods get advanced smart bins while low-income areas rely on traditional methods, creating environmental justice issues."
        },
        {
          title: "Job Displacement Concerns",
          description: "Automation in waste sorting may eliminate traditional waste management jobs.",
          impact: "Medium",
          details: "Waste pickers and manual sorters face unemployment as robotic systems replace human labor, requiring retraining programs."
        },
        {
          title: "Privacy and Data Security",
          description: "Smart bins collect data about household waste patterns, raising privacy concerns.",
          impact: "Medium",
          details: "Waste data can reveal personal information about consumption habits, health conditions, and lifestyle choices."
        },
        {
          title: "Environmental Impact of Technology",
          description: "Electronic components in smart systems create additional e-waste when systems reach end-of-life.",
          impact: "Medium",
          details: "Sensors, processors, and batteries in smart waste systems eventually become waste themselves, potentially offsetting environmental benefits."
        }
      ]
    }
  };

  const solutions = [
    {
      title: "Hybrid AI-Human Systems",
      description: "Combining AI accuracy with human oversight for complex cases",
      implementation: "Deploy AI for initial sorting with human verification for uncertain classifications"
    },
    {
      title: "Standardization Initiatives",
      description: "Developing industry standards for smart waste technologies",
      implementation: "Create interoperable protocols and common data formats across vendors"
    },
    {
      title: "Edge Computing Solutions",
      description: "Processing data locally to reduce latency and network dependency",
      implementation: "Implement on-device AI processing with cloud backup for model updates"
    },
    {
      title: "Community Engagement Programs",
      description: "Education and incentive programs to improve user compliance",
      implementation: "Gamification, rewards systems, and comprehensive training programs"
    }
  ];

  const getImpactColor = (impact) => {
    switch(impact) {
      case 'Critical': return 'text-red-600 bg-red-100';
      case 'High': return 'text-orange-600 bg-orange-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Smart Waste Segregation & Recycling Systems
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Current Issues and Challenges in 2024-2025
          </p>
          <div className="flex justify-center items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center">
              <BarChart3 className="w-4 h-4 mr-1" />
              <span>Accuracy: 72.8% - 99.95%</span>
            </div>
            <div className="flex items-center">
              <DollarSign className="w-4 h-4 mr-1" />
              <span>Cost Savings: Up to 13.35%</span>
            </div>
            <div className="flex items-center">
              <Recycle className="w-4 h-4 mr-1" />
              <span>Transportation Reduction: 36.8%</span>
            </div>
          </div>
        </div>

       
        {/* Category Navigation */}
        <div className="flex flex-wrap justify-center mb-8 space-x-2 space-y-2">
          {Object.entries(issueCategories).map(([key, category]) => (
            <button
              key={key}
              onClick={() => setSelectedCategory(key)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                selectedCategory === key
                  ? `${category.color} text-white shadow-lg transform scale-105`
                  : "bg-white text-gray-700 hover:bg-gray-50 shadow-md"
              }`}
            >
              {category.icon}
              <span>{category.title}</span>
            </button>
          ))}
        </div>


        {/* Issues Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {issueCategories[selectedCategory].issues.map((issue, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-800">{issue.title}</h3>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getImpactColor(
                    issue.impact
                  )}`}
                >
                  {issue.impact} Impact
                </span>
              </div>
              <p className="text-gray-600 mb-4">{issue.description}</p>
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-700 mb-2">Detailed Analysis:</h4>
                <p className="text-sm text-gray-600">{issue.details}</p>
              </div>
            </div>
          ))}
        </div>


        {/* Key Statistics */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <BarChart3 className="w-6 h-6 mr-2 text-blue-500" />
            Current System Performance Metrics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">72.8% - 99.95%</div>
              <div className="text-sm text-gray-600">AI Classification Accuracy Range</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-3xl font-bold text-green-600 mb-2">36.8%</div>
              <div className="text-sm text-gray-600">Transportation Distance Reduction</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-3xl font-bold text-purple-600 mb-2">92%</div>
              <div className="text-sm text-gray-600">Average AI Monitoring Accuracy</div>
            </div>
          </div>
        </div>

        {/* Solutions Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <Shield className="w-6 h-6 mr-2 text-green-500" />
            Emerging Solutions & Best Practices
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {solutions.map((solution, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-5 hover:border-green-300 transition-colors duration-300">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">{solution.title}</h3>
                <p className="text-gray-600 mb-4">{solution.description}</p>
                <div className="bg-green-50 rounded-lg p-3">
                  <span className="text-sm font-medium text-green-700">Implementation:</span>
                  <p className="text-sm text-green-600 mt-1">{solution.implementation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Current Trends */}
        <div className="mt-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <Wifi className="w-6 h-6 mr-2" />
            2024-2025 Technology Trends
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Multi-layered CNNs</h3>
              <p className="text-sm opacity-90">Advanced convolutional neural networks for improved classification accuracy</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Robotic Integration</h3>
              <p className="text-sm opacity-90">Robotic arms with AI vision for automated physical sorting</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <h3 className="font-semibold mb-2">IoT Sensor Fusion</h3>
              <p className="text-sm opacity-90">Combining visual, weight, and chemical sensors for comprehensive analysis</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Data sourced from recent research papers and industry reports (2024-2025)</p>
          <p className="mt-2">Smart waste management technology continues to evolve rapidly</p>
        </div>
      </div>
    </div>
  );
};

export default SmartWasteIssuesDashboard;