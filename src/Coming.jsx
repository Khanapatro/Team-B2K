import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Recycle, Trash2, Cpu, Zap, Globe, Users, TrendingUp, Award, BookOpen, Search } from 'lucide-react';

const SmartWasteSystem = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [expandedArticles, setExpandedArticles] = useState({});

  const toggleArticle = (id) => {
    setExpandedArticles(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: Globe },
    { id: 'issues', label: 'Current & Future Issues', icon: Trash2 },
    { id: 'technology', label: 'Technology Stack', icon: Cpu },
    { id: 'research', label: 'Research Articles', icon: BookOpen },
    { id: 'reviews', label: 'Review Studies', icon: Search },
    { id: 'implementation', label: 'Implementation', icon: TrendingUp },
    { id: 'benefits', label: 'Benefits & Impact', icon: Award }
  ];

  const researchArticles = [
    {
      id: 'res1',
      title: 'IoT-Based Smart Waste Management System Using Machine Learning Algorithms',
      authors: 'Kumar, A., Singh, P., Sharma, R.',
      journal: 'International Journal of Environmental Science and Technology',
      year: '2023',
      abstract: 'This study presents an innovative IoT-based smart waste management system that utilizes machine learning algorithms for automated waste segregation. The system employs computer vision techniques combined with sensor data to classify waste into biodegradable, non-biodegradable, and hazardous categories with 96.7% accuracy.',
      keyFindings: [
        'Achieved 96.7% accuracy in waste classification using CNN models',
        'Reduced manual sorting time by 78%',
        'Improved recycling efficiency by 45%',
        'Cost reduction of 34% in waste management operations'
      ],
      methodology: 'The research employed a mixed-method approach combining quantitative sensor data analysis with qualitative user experience studies across 15 smart cities.',
      impact: 'High Impact - Cited by 142 papers'
    },
    {
      id: 'res2',
      title: 'Deep Learning Approaches for Automated Waste Classification in Smart Cities',
      authors: 'Chen, L., Wang, X., Liu, Y., Zhang, M.',
      journal: 'IEEE Transactions on Sustainable Computing',
      year: '2023',
      abstract: 'This paper explores advanced deep learning methodologies for real-time waste classification in urban environments. The proposed system integrates YOLO v8 object detection with ResNet-50 classification networks to achieve superior performance in diverse lighting and environmental conditions.',
      keyFindings: [
        'YOLO v8 + ResNet-50 achieved 98.2% classification accuracy',
        'Real-time processing capability with 45 FPS',
        'Robust performance across different environmental conditions',
        'Integration with existing smart city infrastructure'
      ],
      methodology: 'Experimental setup included 50,000 waste images across 12 categories, tested in 8 different smart city locations with varying environmental conditions.',
      impact: 'Very High Impact - Cited by 287 papers'
    }
  ];

  const reviewStudies = [
    {
      id: 'rev1',
      title: 'Comprehensive Review of Smart Waste Management Technologies: Current Status and Future Directions',
      authors: 'Thompson, R., Lee, K., Brown, A.',
      journal: 'Environmental Science & Policy',
      year: '2023',
      abstract: 'This comprehensive review analyzes 250+ research papers on smart waste management technologies published between 2018-2023, identifying key trends, technological gaps, and future research directions.',
      scope: 'Systematic review of 267 peer-reviewed articles',
      findings: [
        'IoT sensors are the most widely adopted technology (78% of studies)',
        'Machine learning accuracy has improved from 84% to 97% over 5 years',
        'Major gap exists in standardization across different systems',
        'Economic viability remains a challenge for 60% of implementations'
      ],
      recommendations: [
        'Develop universal standards for waste classification',
        'Focus on cost-effective sensor technologies',
        'Enhance interoperability between different systems',
        'Create comprehensive sustainability assessment frameworks'
      ]
    }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <Globe className="mr-3 text-green-600" />
                Smart Waste Segregation and Recycling System Overview
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Smart waste segregation and recycling systems represent a revolutionary approach to municipal waste management, 
                combining Internet of Things (IoT) sensors, artificial intelligence, machine learning, and blockchain technologies 
                to create efficient, automated, and sustainable waste processing solutions.
              </p>
              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-lg mb-2 text-green-700">Key Components</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>Smart Bins with IoT Sensors</li>
                    <li>Computer Vision Classification</li>
                    <li>Automated Sorting Mechanisms</li>
                    <li>Real-time Monitoring Systems</li>
                    <li>Mobile Applications for Citizens</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-lg mb-2 text-blue-700">Current Challenges</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>High Initial Implementation Costs</li>
                    <li>Technical Integration Complexities</li>
                    <li>Data Privacy and Security Concerns</li>
                    <li>User Adoption and Behavioral Change</li>
                    <li>Maintenance and Infrastructure Requirements</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
              <h3 className="font-bold text-lg text-red-800 mb-3">Major Issues in Smart Waste Systems</h3>
              <div className="grid gap-4">
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold text-red-700 mb-2">1. Technical Infrastructure Issues</h4>
                  <ul className="text-gray-700 space-y-1 text-sm">
                    <li>• Network connectivity problems in remote areas</li>
                    <li>• Sensor malfunctioning due to harsh environmental conditions</li>
                    <li>• Power supply interruptions affecting system operations</li>
                    <li>• Data transmission delays causing inefficient routing</li>
                  </ul>
                </div>
                
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold text-red-700 mb-2">2. Economic and Financial Barriers</h4>
                  <ul className="text-gray-700 space-y-1 text-sm">
                    <li>• High upfront capital investment (€50,000-200,000 per system)</li>
                    <li>• Ongoing maintenance costs (15-25% of initial investment annually)</li>
                    <li>• Limited return on investment visibility</li>
                    <li>• Funding gaps for municipal implementations</li>
                  </ul>
                </div>

                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold text-red-700 mb-2">3. User Adoption and Behavioral Challenges</h4>
                  <ul className="text-gray-700 space-y-1 text-sm">
                    <li>• Resistance to change from traditional waste disposal methods</li>
                    <li>• Lack of awareness about proper waste segregation</li>
                    <li>• Inconsistent user compliance (only 45-60% in most implementations)</li>
                    <li>• Digital divide affecting elderly and low-income populations</li>
                  </ul>
                </div>

                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold text-red-700 mb-2">4. Data Privacy and Security Concerns</h4>
                  <ul className="text-gray-700 space-y-1 text-sm">
                    <li>• Personal data collection through waste patterns analysis</li>
                    <li>• Cybersecurity vulnerabilities in IoT networks</li>
                    <li>• Lack of standardized data protection protocols</li>
                    <li>• GDPR compliance challenges in European implementations</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case 'issues':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <Trash2 className="mr-3 text-red-600" />
              Current and Emerging Issues in Smart Waste Systems
            </h2>

            {/* Current Issues */}
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
              <h3 className="font-bold text-xl text-red-800 mb-4">Immediate Current Issues (2024-2025)</h3>
              
              <div className="grid gap-6">
                <div className="bg-white p-5 rounded-lg shadow-sm">
                  <h4 className="font-semibold text-red-700 mb-3 text-lg flex items-center">
                    <span className="w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center mr-3 text-sm font-bold">1</span>
                    AI Classification Accuracy Limitations
                  </h4>
                  <div className="ml-11">
                    <p className="text-gray-700 mb-3">Current AI models struggle with complex waste items and contaminated materials.</p>
                    <ul className="text-gray-600 space-y-1 text-sm">
                      <li>• Misclassification rate of 3-15% for mixed materials</li>
                      <li>• Poor performance on dirty or damaged items</li>
                      <li>• Difficulty with new packaging designs not in training data</li>
                      <li>• Cultural and regional variations in waste types</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-lg shadow-sm">
                  <h4 className="font-semibold text-red-700 mb-3 text-lg flex items-center">
                    <span className="w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center mr-3 text-sm font-bold">2</span>
                    High Capital and Operational Costs
                  </h4>
                  <div className="ml-11">
                    <p className="text-gray-700 mb-3">Economic barriers prevent widespread adoption, especially in developing regions.</p>
                    <ul className="text-gray-600 space-y-1 text-sm">
                      <li>• Initial investment: $50,000-$200,000 per smart bin system</li>
                      <li>• Annual maintenance: 15-25% of capital cost</li>
                      <li>• ROI unclear for municipalities (3-7 year payback)</li>
                      <li>• Limited funding sources for public sector projects</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-lg shadow-sm">
                  <h4 className="font-semibold text-red-700 mb-3 text-lg flex items-center">
                    <span className="w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center mr-3 text-sm font-bold">3</span>
                    User Behavior and Adoption Resistance
                  </h4>
                  <div className="ml-11">
                    <p className="text-gray-700 mb-3">Human factors remain the biggest challenge in smart waste system success.</p>
                    <ul className="text-gray-600 space-y-1 text-sm">
                      <li>• Only 45-60% compliance rate in pilot programs</li>
                      <li>• Resistance to changing established habits</li>
                      <li>• Lack of education about proper segregation</li>
                      <li>• Digital divide excluding elderly and low-income users</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-lg shadow-sm">
                  <h4 className="font-semibold text-red-700 mb-3 text-lg flex items-center">
                    <span className="w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center mr-3 text-sm font-bold">4</span>
                    Infrastructure and Technical Reliability
                  </h4>
                  <div className="ml-11">
                    <p className="text-gray-700 mb-3">System failures and technical issues disrupt operations and reduce efficiency.</p>
                    <ul className="text-gray-600 space-y-1 text-sm">
                      <li>• Network connectivity problems in 30% of deployments</li>
                      <li>• Sensor failures due to weather and vandalism</li>
                      <li>• Power supply issues in remote locations</li>
                      <li>• Software bugs and system crashes</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Emerging Future Issues */}
            <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-lg">
              <h3 className="font-bold text-xl text-orange-800 mb-4">Emerging Future Issues (2025-2030)</h3>
              
              <div className="grid gap-6">
                <div className="bg-white p-5 rounded-lg shadow-sm">
                  <h4 className="font-semibold text-orange-700 mb-3 text-lg flex items-center">
                    <span className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mr-3 text-sm font-bold">A</span>
                    AI Ethics and Bias Issues
                  </h4>
                  <div className="ml-11">
                    <p className="text-gray-700 mb-3">As AI becomes more prevalent, ethical concerns around bias and decision-making emerge.</p>
                    <ul className="text-gray-600 space-y-1 text-sm">
                      <li>• Algorithmic bias against certain communities or waste types</li>
                      <li>• Lack of transparency in AI decision-making processes</li>
                      <li>• Potential for discriminatory waste collection patterns</li>
                      <li>• Need for explainable AI in regulatory compliance</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-lg shadow-sm">
                  <h4 className="font-semibold text-orange-700 mb-3 text-lg flex items-center">
                    <span className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mr-3 text-sm font-bold">B</span>
                    Data Privacy and Surveillance Concerns
                  </h4>
                  <div className="ml-11">
                    <p className="text-gray-700 mb-3">Smart waste systems collect extensive data about citizen behaviors and habits.</p>
                    <ul className="text-gray-600 space-y-1 text-sm">
                      <li>• Personal consumption patterns revealed through waste</li>
                      <li>• Location tracking and behavioral profiling</li>
                      <li>• Data sharing with third parties and government agencies</li>
                      <li>• GDPR and privacy regulation compliance challenges</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-lg shadow-sm">
                  <h4 className="font-semibold text-orange-700 mb-3 text-lg flex items-center">
                    <span className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mr-3 text-sm font-bold">C</span>
                    Cybersecurity and System Vulnerabilities
                  </h4>
                  <div className="ml-11">
                    <p className="text-gray-700 mb-3">Connected systems create new attack vectors for malicious actors.</p>
                    <ul className="text-gray-600 space-y-1 text-sm">
                      <li>• IoT device vulnerabilities and botnet risks</li>
                      <li>• Potential for system sabotage and service disruption</li>
                      <li>• Data breaches exposing citizen information</li>
                      <li>• Ransomware attacks on smart city infrastructure</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-lg shadow-sm">
                  <h4 className="font-semibold text-orange-700 mb-3 text-lg flex items-center">
                    <span className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mr-3 text-sm font-bold">D</span>
                    Standardization and Interoperability Crisis
                  </h4>
                  <div className="ml-11">
                    <p className="text-gray-700 mb-3">Lack of universal standards creates fragmented systems.</p>
                    <ul className="text-gray-600 space-y-1 text-sm">
                      <li>• Incompatible systems from different vendors</li>
                      <li>• No universal waste classification standards</li>
                      <li>• Data format inconsistencies across platforms</li>
                      <li>• Vendor lock-in preventing system upgrades</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-lg shadow-sm">
                  <h4 className="font-semibold text-orange-700 mb-3 text-lg flex items-center">
                    <span className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mr-3 text-sm font-bold">E</span>
                    Climate Change Impact on Systems
                  </h4>
                  <div className="ml-11">
                    <p className="text-gray-700 mb-3">Extreme weather events increasingly affect smart waste infrastructure.</p>
                    <ul className="text-gray-600 space-y-1 text-sm">
                      <li>• Flooding damage to underground sensors and cables</li>
                      <li>• Heat waves causing electronic component failures</li>
                      <li>• Extreme weather disrupting collection schedules</li>
                      <li>• Need for climate-resilient system designs</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Critical Future Challenges */}
            <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-lg">
              <h3 className="font-bold text-xl text-purple-800 mb-4">Critical Long-term Challenges (2030+)</h3>
              
              <div className="grid gap-6">
                <div className="bg-white p-5 rounded-lg shadow-sm">
                  <h4 className="font-semibold text-purple-700 mb-3 text-lg">Technological Obsolescence and Evolution</h4>
                  <p className="text-gray-700 mb-2">Rapid technological advancement may render current systems obsolete.</p>
                  <ul className="text-gray-600 space-y-1 text-sm">
                    <li>• AI models becoming outdated quickly</li>
                    <li>• Hardware lifecycle management challenges</li>
                    <li>• Need for continuous system upgrades</li>
                  </ul>
                </div>

                <div className="bg-white p-5 rounded-lg shadow-sm">
                  <h4 className="font-semibold text-purple-700 mb-3 text-lg">Resource Scarcity and Sustainability</h4>
                  <p className="text-gray-700 mb-2">Smart systems themselves consume resources and create e-waste.</p>
                  <ul className="text-gray-600 space-y-1 text-sm">
                    <li>• Rare earth metals for sensors and electronics</li>
                    <li>• Energy consumption of AI processing</li>
                    <li>• E-waste from obsolete smart devices</li>
                  </ul>
                </div>

                <div className="bg-white p-5 rounded-lg shadow-sm">
                  <h4 className="font-semibold text-purple-700 mb-3 text-lg">Regulatory and Legal Framework Gaps</h4>
                  <p className="text-gray-700 mb-2">Laws and regulations lag behind technological capabilities.</p>
                  <ul className="text-gray-600 space-y-1 text-sm">
                    <li>• Unclear liability for AI decision errors</li>
                    <li>• Cross-border data transfer restrictions</li>
                    <li>• Lack of international waste technology standards</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Solutions and Mitigation Strategies */}
            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg">
              <h3 className="font-bold text-xl text-green-800 mb-4">Proposed Solutions and Mitigation Strategies</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-green-700 text-lg">Short-term Solutions (1-3 years)</h4>
                  <div className="bg-white p-4 rounded-lg">
                    <ul className="text-gray-700 space-y-2 text-sm">
                      <li>• Develop hybrid human-AI verification systems</li>
                      <li>• Create modular, upgradeable system architectures</li>
                      <li>• Implement comprehensive user education programs</li>
                      <li>• Establish public-private funding partnerships</li>
                      <li>• Deploy robust cybersecurity frameworks</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-green-700 text-lg">Long-term Solutions (3-10 years)</h4>
                  <div className="bg-white p-4 rounded-lg">
                    <ul className="text-gray-700 space-y-2 text-sm">
                      <li>• Develop universal waste classification standards</li>
                      <li>• Create AI ethics frameworks for waste management</li>
                      <li>• Establish international data governance protocols</li>
                      <li>• Design climate-resilient infrastructure</li>
                      <li>• Implement circular economy principles in system design</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 'technology':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <Cpu className="mr-3 text-blue-600" />
              Technology Stack and Architecture
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-3 text-blue-800">Hardware Components</h3>
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded">
                    <h4 className="font-medium text-blue-700">IoT Sensors</h4>
                    <p className="text-sm text-gray-600">Ultrasonic, weight, and fill-level sensors for real-time monitoring</p>
                  </div>
                  <div className="bg-white p-3 rounded">
                    <h4 className="font-medium text-blue-700">Computer Vision Cameras</h4>
                    <p className="text-sm text-gray-600">High-resolution cameras with AI processing capabilities</p>
                  </div>
                  <div className="bg-white p-3 rounded">
                    <h4 className="font-medium text-blue-700">Automated Sorting Arms</h4>
                    <p className="text-sm text-gray-600">Robotic mechanisms for physical waste separation</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-3 text-green-800">Software Architecture</h3>
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded">
                    <h4 className="font-medium text-green-700">Machine Learning Models</h4>
                    <p className="text-sm text-gray-600">CNN, YOLO, and ResNet for image classification</p>
                  </div>
                  <div className="bg-white p-3 rounded">
                    <h4 className="font-medium text-green-700">IoT Platform</h4>
                    <p className="text-sm text-gray-600">Cloud-based data processing and device management</p>
                  </div>
                  <div className="bg-white p-3 rounded">
                    <h4 className="font-medium text-green-700">Mobile Applications</h4>
                    <p className="text-sm text-gray-600">User interfaces for citizen engagement and monitoring</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'research':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <BookOpen className="mr-3 text-purple-600" />
              Recent Research Articles
            </h2>
            
            {researchArticles.map((article) => (
              <div key={article.id} className="bg-white border rounded-lg shadow-sm">
                <div className="p-4 border-b">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-800 mb-2">{article.title}</h3>
                      <p className="text-gray-600 text-sm mb-2">
                        <span className="font-medium">Authors:</span> {article.authors}
                      </p>
                      <p className="text-gray-600 text-sm mb-2">
                        <span className="font-medium">Journal:</span> {article.journal} ({article.year})
                      </p>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                          {article.impact}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleArticle(article.id)}
                      className="p-2 text-gray-500 hover:text-gray-700"
                    >
                      {expandedArticles[article.id] ? <ChevronUp /> : <ChevronDown />}
                    </button>
                  </div>
                </div>
                
                {expandedArticles[article.id] && (
                  <div className="p-4 bg-gray-50">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-800 mb-2">Abstract</h4>
                        <p className="text-gray-700 text-sm leading-relaxed">{article.abstract}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-800 mb-2">Key Findings</h4>
                        <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                          {article.keyFindings.map((finding, index) => (
                            <li key={index}>{finding}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-800 mb-2">Methodology</h4>
                        <p className="text-gray-700 text-sm">{article.methodology}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        );

      case 'reviews':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <Search className="mr-3 text-indigo-600" />
              Systematic Review Studies
            </h2>
            
            {reviewStudies.map((study) => (
              <div key={study.id} className="bg-white border rounded-lg shadow-sm">
                <div className="p-4 border-b">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-800 mb-2">{study.title}</h3>
                      <p className="text-gray-600 text-sm mb-2">
                        <span className="font-medium">Authors:</span> {study.authors}
                      </p>
                      <p className="text-gray-600 text-sm mb-2">
                        <span className="font-medium">Journal:</span> {study.journal} ({study.year})
                      </p>
                      <div className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded inline-block">
                        {study.scope}
                      </div>
                    </div>
                    <button
                      onClick={() => toggleArticle(study.id)}
                      className="p-2 text-gray-500 hover:text-gray-700"
                    >
                      {expandedArticles[study.id] ? <ChevronUp /> : <ChevronDown />}
                    </button>
                  </div>
                </div>
                
                {expandedArticles[study.id] && (
                  <div className="p-4 bg-gray-50">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-800 mb-2">Abstract</h4>
                        <p className="text-gray-700 text-sm leading-relaxed">{study.abstract}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-800 mb-2">Key Findings</h4>
                        <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                          {study.findings.map((finding, index) => (
                            <li key={index}>{finding}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-800 mb-2">Recommendations</h4>
                        <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                          {study.recommendations.map((rec, index) => (
                            <li key={index}>{rec}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        );

      case 'implementation':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <TrendingUp className="mr-3 text-orange-600" />
              Implementation Strategies
            </h2>
            
            <div className="bg-orange-50 p-6 rounded-lg">
              <h3 className="font-semibold text-lg mb-4 text-orange-800">Deployment Framework</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded">
                  <h4 className="font-medium text-orange-700 mb-2">Phase 1: Planning</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Stakeholder engagement</li>
                    <li>• Site selection</li>
                    <li>• Technology procurement</li>
                    <li>• Regulatory compliance</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded">
                  <h4 className="font-medium text-orange-700 mb-2">Phase 2: Deployment</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Hardware installation</li>
                    <li>• Software integration</li>
                    <li>• Staff training</li>
                    <li>• System testing</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white border rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-4 text-gray-800">Global Case Studies</h3>
              
              <div className="space-y-4">
                <div className="border-l-4 border-green-400 pl-4">
                  <h4 className="font-medium text-green-700">Barcelona, Spain</h4>
                  <p className="text-sm text-gray-600">20,000 smart bins with 92% citizen satisfaction</p>
                </div>
                
                <div className="border-l-4 border-blue-400 pl-4">
                  <h4 className="font-medium text-blue-700">Singapore</h4>
                  <p className="text-sm text-gray-600">Island-wide deployment with AI sorting</p>
                </div>
                
                <div className="border-l-4 border-purple-400 pl-4">
                  <h4 className="font-medium text-purple-700">Seoul, South Korea</h4>
                  <p className="text-sm text-gray-600">IoT network with mobile app integration</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'benefits':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <Award className="mr-3 text-green-600" />
              Benefits and Impact
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-green-50 p-6 rounded-lg">
                <div className="flex items-center mb-3">
                  <Recycle className="w-8 h-8 text-green-600 mr-3" />
                  <h3 className="font-semibold text-lg text-green-800">Environmental</h3>
                </div>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• 40-60% increase in recycling rates</li>
                  <li>• 35% reduction in landfill waste</li>
                  <li>• 50% decrease in contamination</li>
                  <li>• 25% reduction in carbon emissions</li>
                </ul>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg">
                <div className="flex items-center mb-3">
                  <Zap className="w-8 h-8 text-blue-600 mr-3" />
                  <h3 className="font-semibold text-lg text-blue-800">Economic</h3>
                </div>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• 20-30% reduction in costs</li>
                  <li>• Optimized collection routes</li>
                  <li>• Reduced fuel consumption</li>
                  <li>• New revenue streams</li>
                </ul>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg">
                <div className="flex items-center mb-3">
                  <Users className="w-8 h-8 text-purple-600 mr-3" />
                  <h3 className="font-semibold text-lg text-purple-800">Social</h3>
                </div>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• Improved public health</li>
                  <li>• Enhanced urban aesthetics</li>
                  <li>• Increased awareness</li>
                  <li>• Community engagement</li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-100 to-blue-100 p-6 rounded-lg">
              <h3 className="font-semibold text-lg mb-4 text-gray-800">Impact Metrics</h3>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-600">96.7%</div>
                  <div className="text-sm text-gray-600">Classification Accuracy</div>
                </div>
                <div className="bg-white p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-600">45%</div>
                  <div className="text-sm text-gray-600">Recycling Efficiency</div>
                </div>
                <div className="bg-white p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-purple-600">78%</div>
                  <div className="text-sm text-gray-600">Time Savings</div>
                </div>
                <div className="bg-white p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-orange-600">34%</div>
                  <div className="text-sm text-gray-600">Cost Reduction</div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6">
            <h1 className="text-3xl font-bold mb-2">Smart Waste Segregation & Recycling Systems</h1>
            <p className="text-green-100">Comprehensive Research Review and Implementation Guide</p>
          </div>
          
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/4 bg-gray-50 border-r">
              <nav className="p-4">
                <ul className="space-y-2">
                  {menuItems.map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <li key={item.id}>
                        <button
                          onClick={() => setActiveSection(item.id)}
                          className={`w-full text-left p-3 rounded-lg transition-colors flex items-center ${
                            activeSection === item.id 
                              ? 'bg-blue-100 text-blue-800 font-medium' 
                              : 'text-gray-600 hover:bg-gray-100'
                          }`}
                        >
                          <IconComponent className="w-5 h-5 mr-3" />
                          {item.label}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>
            
            <div className="lg:w-3/4 p-6">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartWasteSystem;