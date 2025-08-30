import axios from 'axios';
import { incidentService } from '../incidentService';

// Mock axios
jest.mock('axios');
const mockedAxios = axios;

describe('incidentService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllIncidents', () => {
    it('should fetch all incidents successfully', async () => {
      const mockIncidents = [
        { id: 1, title: 'Test Incident 1' },
        { id: 2, title: 'Test Incident 2' },
      ];
      
      mockedAxios.get.mockResolvedValueOnce({
        data: { data: mockIncidents }
      });

      const result = await incidentService.getAllIncidents();
      
      expect(mockedAxios.get).toHaveBeenCalledWith('/incidents');
      expect(result).toEqual(mockIncidents);
    });

    it('should handle direct data response', async () => {
      const mockIncidents = [
        { id: 1, title: 'Test Incident 1' },
      ];
      
      mockedAxios.get.mockResolvedValueOnce({
        data: mockIncidents
      });

      const result = await incidentService.getAllIncidents();
      
      expect(result).toEqual(mockIncidents);
    });

    it('should throw error on failure', async () => {
      const errorMessage = 'Network error';
      mockedAxios.get.mockRejectedValueOnce(new Error(errorMessage));

      await expect(incidentService.getAllIncidents()).rejects.toThrow(errorMessage);
    });
  });

  describe('getIncidentById', () => {
    it('should fetch incident by ID successfully', async () => {
      const mockIncident = { id: 1, title: 'Test Incident' };
      
      mockedAxios.get.mockResolvedValueOnce({
        data: { data: mockIncident }
      });

      const result = await incidentService.getIncidentById(1);
      
      expect(mockedAxios.get).toHaveBeenCalledWith('/incidents/1');
      expect(result).toEqual(mockIncident);
    });

    it('should throw error on failure', async () => {
      const errorMessage = 'Not found';
      mockedAxios.get.mockRejectedValueOnce(new Error(errorMessage));

      await expect(incidentService.getIncidentById(1)).rejects.toThrow(errorMessage);
    });
  });

  describe('createIncident', () => {
    it('should create incident successfully', async () => {
      const incidentData = {
        title: 'New Incident',
        description: 'Test description',
        affected_service: 'Test Service'
      };
      
      const mockCreatedIncident = { id: 1, ...incidentData };
      
      mockedAxios.post.mockResolvedValueOnce({
        data: { data: mockCreatedIncident }
      });

      const result = await incidentService.createIncident(incidentData);
      
      expect(mockedAxios.post).toHaveBeenCalledWith('/incidents', incidentData);
      expect(result).toEqual(mockCreatedIncident);
    });

    it('should throw error on failure', async () => {
      const incidentData = { title: 'Test' };
      const errorMessage = 'Validation error';
      mockedAxios.post.mockRejectedValueOnce(new Error(errorMessage));

      await expect(incidentService.createIncident(incidentData)).rejects.toThrow(errorMessage);
    });
  });

  describe('updateIncident', () => {
    it('should update incident successfully', async () => {
      const updateData = { title: 'Updated Title' };
      const mockUpdatedIncident = { id: 1, title: 'Updated Title' };
      
      mockedAxios.put.mockResolvedValueOnce({
        data: { data: mockUpdatedIncident }
      });

      const result = await incidentService.updateIncident(1, updateData);
      
      expect(mockedAxios.put).toHaveBeenCalledWith('/incidents/1', updateData);
      expect(result).toEqual(mockUpdatedIncident);
    });

    it('should throw error on failure', async () => {
      const updateData = { title: 'Updated' };
      const errorMessage = 'Update failed';
      mockedAxios.put.mockRejectedValueOnce(new Error(errorMessage));

      await expect(incidentService.updateIncident(1, updateData)).rejects.toThrow(errorMessage);
    });
  });

  describe('deleteIncident', () => {
    it('should delete incident successfully', async () => {
      mockedAxios.delete.mockResolvedValueOnce({});

      await incidentService.deleteIncident(1);
      
      expect(mockedAxios.delete).toHaveBeenCalledWith('/incidents/1');
    });

    it('should throw error on failure', async () => {
      const errorMessage = 'Delete failed';
      mockedAxios.delete.mockRejectedValueOnce(new Error(errorMessage));

      await expect(incidentService.deleteIncident(1)).rejects.toThrow(errorMessage);
    });
  });

  describe('healthCheck', () => {
    it('should perform health check successfully', async () => {
      const mockHealth = { status: 'ok' };
      
      mockedAxios.get.mockResolvedValueOnce({
        data: mockHealth
      });

      const result = await incidentService.healthCheck();
      
      expect(mockedAxios.get).toHaveBeenCalledWith('/health');
      expect(result).toEqual(mockHealth);
    });

    it('should throw error on failure', async () => {
      const errorMessage = 'Health check failed';
      mockedAxios.get.mockRejectedValueOnce(new Error(errorMessage));

      await expect(incidentService.healthCheck()).rejects.toThrow(errorMessage);
    });
  });
});
