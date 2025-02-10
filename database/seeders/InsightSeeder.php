<?php

namespace Database\Seeders;

use App\Models\Insight;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;

class InsightSeeder extends Seeder
{
    public function run(): void
    {
        $insights = [
            [
                'title' => 'Enterprise Digital Transformation: A Strategic Roadmap',
                'description' => 'Learn how successful enterprises are navigating their digital transformation journey with strategic planning and innovative technologies.',
                'category' => 'Digital Transformation',
                'read_time' => 8,
                'image' => '/images/emp/rob_thomas23_African_American_Business_professionals_in_a_moder_0f48e92a-5e85-4e9f-9713-d384e5873a22.png',
                'content' => "Digital transformation is more than just implementing new technologies—it's about fundamentally changing how your business operates and delivers value to customers. This comprehensive guide explores the key elements of successful enterprise digital transformation.

## Key Components of Digital Transformation

1. **Strategic Vision and Leadership**
   - Defining clear transformation goals
   - Building a culture of innovation
   - Securing executive buy-in and support

2. **Technology Infrastructure**
   - Cloud migration strategies
   - Legacy system modernization
   - Data architecture optimization

3. **Employee Enablement**
   - Digital skills training programs
   - Change management practices
   - Collaborative tools and platforms

## Implementation Framework

1. Assessment Phase
   - Current state analysis
   - Gap identification
   - Resource evaluation

2. Planning Phase
   - Roadmap development
   - Technology selection
   - Timeline creation

3. Execution Phase
   - Agile implementation
   - Continuous feedback
   - Iterative improvements

## Measuring Success

- KPI development
- ROI tracking
- Employee adoption metrics
- Customer satisfaction indicators",
                'is_published' => true,
                'published_at' => Carbon::now()->subDays(5),
            ],
            [
                'title' => 'Cloud Security Best Practices for Enterprise Applications',
                'description' => 'Discover essential security measures and strategies to protect your enterprise cloud infrastructure and applications.',
                'category' => 'Security',
                'read_time' => 6,
                'image' => '/images/emp/rob_thomas23_African_American_CEO_and_Chief_Executive_Talking_A_72595ef3-0f82-49e6-bbd3-9b4581e80520.png',
                'content' => "As enterprises continue to migrate their operations to the cloud, maintaining robust security measures becomes increasingly critical. This article outlines essential security practices for protecting your cloud infrastructure.

## Foundation of Cloud Security

1. **Identity and Access Management (IAM)**
   - Role-based access control
   - Multi-factor authentication
   - Principle of least privilege

2. **Data Protection**
   - Encryption at rest and in transit
   - Regular backup procedures
   - Data classification policies

3. **Network Security**
   - Virtual private clouds
   - Firewall configurations
   - DDoS protection

## Security Monitoring and Response

1. Continuous Monitoring
   - Real-time threat detection
   - Log analysis
   - Performance metrics

2. Incident Response
   - Response plan development
   - Team training
   - Recovery procedures

## Compliance and Governance

- Regulatory compliance
- Security audits
- Policy enforcement
- Documentation requirements",
                'is_published' => true,
                'published_at' => Carbon::now()->subDays(3),
            ],
            [
                'title' => 'The Future of Enterprise IoT Solutions',
                'description' => 'Explore how IoT is revolutionizing enterprise operations and creating new opportunities for efficiency and innovation.',
                'category' => 'IoT',
                'read_time' => 7,
                'image' => '/images/emp/rob_thomas23_African_American_Business_professionals_in_a_moder_aa9cdc13-5800-4ce5-8074-5d754c6002f1.png',
                'content' => "The Internet of Things (IoT) is transforming how enterprises operate, collect data, and make decisions. This comprehensive overview explores the latest trends and applications in enterprise IoT.

## Current IoT Trends

1. **Edge Computing Integration**
   - Real-time processing
   - Reduced latency
   - Bandwidth optimization

2. **Predictive Maintenance**
   - Equipment monitoring
   - Failure prediction
   - Maintenance scheduling

3. **Smart Facilities**
   - Energy management
   - Space utilization
   - Environmental monitoring

## Implementation Strategies

1. Infrastructure Requirements
   - Network capacity
   - Device management
   - Data storage solutions

2. Security Considerations
   - Device security
   - Network protection
   - Data privacy

## Future Developments

- 5G integration
- AI/ML capabilities
- Autonomous systems
- Cross-device interoperability",
                'is_published' => true,
                'published_at' => Carbon::now()->subDays(1),
            ],
        ];

        foreach ($insights as $insight) {
            Insight::create($insight);
        }
    }
}
