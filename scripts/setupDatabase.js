const { MongoClient } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = 'jems_production';

async function setupDatabase() {
  if (!MONGODB_URI) {
    console.error('✗ MONGODB_URI not set in .env.local');
    process.exit(1);
  }

  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('✓ Connected to MongoDB');

    const db = client.db(DB_NAME);

    // Create collections
    const collections = [
      'users',
      'studentProfiles',
      'companyProfiles',
      'resumes',
      'mockInterviews',
      'learningPaths',
      'jobPostings',
      'jobApplications',
      'savedJobs',
      'candidateMatches',
      'scheduledInterviews',
      'studentAnalytics',
      'companyAnalytics',
      'activityLogs',
      'notifications',
      'feedback',
      'passwordResets',
    ];

    console.log('\n✓ Creating collections...');
    for (const collectionName of collections) {
      try {
        await db.createCollection(collectionName);
        console.log(`  ✓ ${collectionName}`);
      } catch (err) {
        if (err.codeName === 'NamespaceExists') {
          console.log(`  • ${collectionName} (already exists)`);
        }
      }
    }

    // Create indexes
    console.log('\n✓ Creating indexes...');

    await db.collection('users').createIndex({ email: 1 }, { unique: true });
    await db.collection('users').createIndex({ role: 1 });
    console.log('  ✓ users');

    await db.collection('studentProfiles').createIndex({ userId: 1 }, { unique: true });
    await db.collection('studentProfiles').createIndex({ targetRole: 1 });
    console.log('  ✓ studentProfiles');

    await db.collection('companyProfiles').createIndex({ userId: 1 }, { unique: true });
    console.log('  ✓ companyProfiles');

    await db.collection('resumes').createIndex({ studentId: 1 });
    await db.collection('resumes').createIndex({ atsScore: 1 });
    console.log('  ✓ resumes');

    await db.collection('jobPostings').createIndex({ companyId: 1 });
    await db.collection('jobPostings').createIndex({ status: 1 });
    console.log('  ✓ jobPostings');

    await db.collection('jobApplications').createIndex({ studentId: 1 });
    await db.collection('jobApplications').createIndex({ jobId: 1 });
    await db.collection('jobApplications').createIndex({ studentId: 1, jobId: 1 }, { unique: true });
    console.log('  ✓ jobApplications');

    await db.collection('savedJobs').createIndex({ studentId: 1 });
    await db.collection('savedJobs').createIndex({ jobId: 1 });
    console.log('  ✓ savedJobs');

    await db.collection('candidateMatches').createIndex({ jobId: 1 });
    await db.collection('candidateMatches').createIndex({ studentId: 1 });
    await db.collection('candidateMatches').createIndex({ matchScore: -1 });
    console.log('  ✓ candidateMatches');

    await db.collection('mockInterviews').createIndex({ studentId: 1 });
    console.log('  ✓ mockInterviews');

    await db.collection('learningPaths').createIndex({ studentId: 1 });
    console.log('  ✓ learningPaths');

    await db.collection('scheduledInterviews').createIndex({ studentId: 1 });
    console.log('  ✓ scheduledInterviews');

    await db.collection('activityLogs').createIndex({ userId: 1 });
    console.log('  ✓ activityLogs');

    await db.collection('notifications').createIndex({ userId: 1 });
    console.log('  ✓ notifications');

    await db.collection('passwordResets').createIndex({ email: 1 }, { unique: true });
    // TTL cleanup: Mongo drops the doc once expiresAt (OTP or, once verified, reset-token expiry) is in the past.
    await db.collection('passwordResets').createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });
    console.log('  ✓ passwordResets');

    console.log('\n✓✓✓ Database setup complete! ✓✓✓');

  } catch (error) {
    console.error('✗ Setup failed:', error.message);
    process.exit(1);
  } finally {
    await client.close();
  }
}

setupDatabase();