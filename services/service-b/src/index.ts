import 'reflect-metadata';
import express from 'express';
import bookingRoutes from './routes/booking.routes';
import userRoutes from './routes/user.routes';
import listingRoutes from './routes/listing.routes';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const app = express();
const PORT = process.env.PORT || 4000;

// Determine the server URL based on environment
const isDocker = process.env.SERVICE_A_URL && process.env.SERVICE_A_URL.includes('service-a');
const serverUrl = isDocker ? 'http://localhost:3001' : `http://localhost:${PORT}`;

// Swagger setup with schema definitions
const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Service B API',
      version: '1.0.0',
      description: 'API documentation for Service B - Booking Management Service'
    },
    servers: [
      {
        url: serverUrl,
        description: isDocker ? 'Docker Environment' : 'Local Development'
      }
    ],
    components: {
      schemas: {
        CreateBookingDto: {
          type: 'object',
          properties: {
            fromDate: {
              type: 'string',
              format: 'date-time',
              description: 'Start date of the booking (ISO 8601 format)',
              example: '2024-01-15T10:00:00Z'
            },
            toDate: {
              type: 'string',
              format: 'date-time',
              description: 'End date of the booking (ISO 8601 format)',
              example: '2024-01-17T10:00:00Z'
            },
            status: {
              type: 'string',
              enum: ['confirmed', 'cancelled', 'pending'],
              description: 'Booking status (optional, defaults to pending)',
              example: 'pending'
            },
            userId: {
              type: 'number',
              description: 'ID of the user making the booking',
              example: 1
            },
            listingId: {
              type: 'number',
              description: 'ID of the listing being booked',
              example: 1
            }
          },
          required: ['fromDate', 'toDate', 'userId', 'listingId']
        },
        CreateUserDto: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'User full name',
              example: 'John Doe'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'User email address',
              example: 'john.doe@example.com'
            }
          },
          required: ['name', 'email']
        },
        CreateListingDto: {
          type: 'object',
          properties: {
            title: {
              type: 'string',
              description: 'Listing title',
              example: 'Beautiful Beach House'
            },
            description: {
              type: 'string',
              description: 'Detailed description of the listing',
              example: 'A stunning beachfront property with ocean views'
            },
            price: {
              type: 'number',
              description: 'Price per night',
              example: 150.00
            }
          },
          required: ['title', 'description', 'price']
        },
        BookingResponseDto: {
          type: 'object',
          properties: {
            id: {
              type: 'number',
              description: 'Unique booking ID',
              example: 1
            },
            fromDate: {
              type: 'string',
              format: 'date-time',
              example: '2024-01-15T10:00:00Z'
            },
            toDate: {
              type: 'string',
              format: 'date-time',
              example: '2024-01-17T10:00:00Z'
            },
            status: {
              type: 'string',
              enum: ['confirmed', 'cancelled', 'pending'],
              example: 'confirmed'
            },
            userId: {
              type: 'number',
              example: 1
            },
            listingId: {
              type: 'number',
              example: 1
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              example: '2024-01-10T08:00:00Z'
            }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.ts'], // Adjust if your files are in a different folder
});

// Serve Swagger UI
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/bookings', bookingRoutes);
app.use('/users', userRoutes);
app.use('/listings', listingRoutes);

// Health check
app.get('/health', (req, res) => {
  res.send('OK');
});

app.listen(PORT, () => {
  console.log(`🚀 Service B running at http://localhost:${PORT}`);
  console.log(`📚 API Documentation available at http://localhost:${PORT}/docs`);
  console.log(`🌍 Swagger server URL: ${serverUrl}`);
});
