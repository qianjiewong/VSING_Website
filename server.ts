import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './src/main.server';
import fs from 'fs';
import path from 'path';

const SECRET_TOKEN = 'yourSecretAdminToken123';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');
  const dataDir = path.join(process.cwd(), 'data');
  const eventFilePath = path.join(dataDir, 'event.json');

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Enable JSON body parsing - Use Express built-in instead of body-parser
  server.use(express.json({ limit: '10mb' }));
  server.use(express.urlencoded({ extended: true }));

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('*.*', express.static(browserDistFolder, {
    maxAge: '1y'
  }));

  // Path to JSON data
  const dataFolder = join(process.cwd(), 'data');

  // Ensure data directory exists
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  // GET API to retrieve the JSON
  server.get('/admin/api/data/event', (req, res) => {
    try {
      console.log('GET request for events');
      console.log('Event file path:', eventFilePath);
      
      if (!fs.existsSync(eventFilePath)) {
        console.log('Event file does not exist, creating default...');
        const defaultEvents: never[] = [];
        fs.writeFileSync(eventFilePath, JSON.stringify(defaultEvents, null, 2));
      }
      
      const content = fs.readFileSync(eventFilePath, 'utf8');
      const jsonData = JSON.parse(content);
      console.log('Successfully loaded events:', jsonData.length);
      res.json(jsonData);
    } catch (error) {
      console.error('Failed to read JSON file:', error);
      res.status(500).json({ error: 'Failed to read event data' });
    }
  });

  // PUT API to update entire events array
  server.put('/admin/api/data/event', (req, res) => {
    const token = req.headers['authorization'];
    console.log('PUT request for all events');
    console.log('Authorization header:', token);
    
    if (token !== `Bearer ${SECRET_TOKEN}`) {
      console.log('Unauthorized request');
      return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
      fs.writeFileSync(eventFilePath, JSON.stringify(req.body, null, 2), 'utf-8');
      console.log('Events file updated successfully');
      return res.json({ message: 'Events updated successfully' });
    } catch (err) {
      console.error('Write error:', err);
      return res.status(500).json({ error: 'Failed to write events file' });
    }
  });

  // PUT API to update a single event
  server.put('/admin/api/data/event/:id', (req, res) => {
    const token = req.headers['authorization'];
    const eventId = req.params.id;
    
    console.log('PUT request for single event:', eventId);
    console.log('Request body:', req.body);
    
    if (token !== `Bearer ${SECRET_TOKEN}`) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
      // Read current events
      const content = fs.readFileSync(eventFilePath, 'utf8');
      const events = JSON.parse(content);
      
      // Find and update the specific event
      const eventIndex = events.findIndex((e: any) => e.id === eventId);
      
      if (eventIndex === -1) {
        return res.status(404).json({ error: 'Event not found' });
      }
      
      // Update the event
      events[eventIndex] = { ...events[eventIndex], ...req.body };
      
      // Write back to file
      fs.writeFileSync(eventFilePath, JSON.stringify(events, null, 2), 'utf-8');
      console.log(`Event ${eventId} updated successfully`);
      
      return res.json({ message: 'Event updated successfully', event: events[eventIndex] });
    } catch (err) {
      console.error('Update error:', err);
      return res.status(500).json({ error: 'Failed to update event' });
    }
  });

  // POST API to add a new event
  server.post('/admin/api/data/event', (req, res) => {
    const token = req.headers['authorization'];
    
    if (token !== `Bearer ${SECRET_TOKEN}`) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
      // Read current events
      const content = fs.readFileSync(eventFilePath, 'utf8');
      const events = JSON.parse(content);
      
      // Add new event
      events.push(req.body);
      
      // Write back to file
      fs.writeFileSync(eventFilePath, JSON.stringify(events, null, 2), 'utf-8');
      console.log('New event added successfully');
      
      return res.json({ message: 'Event added successfully', event: req.body });
    } catch (err) {
      console.error('Add error:', err);
      return res.status(500).json({ error: 'Failed to add event' });
    }
  });

  // DELETE API to remove an event
  server.delete('/admin/api/data/event/:id', (req, res) => {
    const token = req.headers['authorization'];
    const eventId = req.params.id;
    
    if (token !== `Bearer ${SECRET_TOKEN}`) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
      // Read current events
      const content = fs.readFileSync(eventFilePath, 'utf8');
      const events = JSON.parse(content);
      
      // Filter out the event to delete
      const filteredEvents = events.filter((e: any) => e.id !== eventId);
      
      if (filteredEvents.length === events.length) {
        return res.status(404).json({ error: 'Event not found' });
      }
      
      // Write back to file
      fs.writeFileSync(eventFilePath, JSON.stringify(filteredEvents, null, 2), 'utf-8');
      console.log(`Event ${eventId} deleted successfully`);
      
      return res.json({ message: 'Event deleted successfully' });
    } catch (err) {
      console.error('Delete error:', err);
      return res.status(500).json({ error: 'Failed to delete event' });
    }
  });

  // POST API to update the JSON - with basic token protection (keep for backward compatibility)
  server.post('/admin/api/data/:filename', (req, res) => {
    const token = req.headers['authorization'];
    const fileName = req.params['filename'];
    const filePath = path.join(process.cwd(), 'data', `${fileName}.json`);

    if (token !== `Bearer ${SECRET_TOKEN}`) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
      fs.writeFileSync(filePath, JSON.stringify(req.body, null, 2), 'utf-8');
      return res.json({ message: 'File updated successfully' });
    } catch (err) {
      console.error('Write error:', err);
      return res.status(500).json({ error: 'Failed to write file' });
    }
  });

  // All regular routes use the Angular engine
  server.get('*', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();