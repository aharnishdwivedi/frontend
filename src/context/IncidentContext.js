import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { incidentService } from '../services/incidentService';
import toast from 'react-hot-toast';

const IncidentContext = createContext();

const initialState = {
  incidents: [],
  loading: false,
  error: null,
  selectedIncident: null,
};

const incidentReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_INCIDENTS':
      return { ...state, incidents: action.payload, loading: false, error: null };
    case 'ADD_INCIDENT':
      return { ...state, incidents: [action.payload, ...state.incidents] };
    case 'SET_SELECTED_INCIDENT':
      return { ...state, selectedIncident: action.payload };
    case 'UPDATE_INCIDENT':
      return {
        ...state,
        incidents: state.incidents.map(incident =>
          incident.id === action.payload.id ? action.payload : incident
        ),
        selectedIncident: state.selectedIncident?.id === action.payload.id 
          ? action.payload 
          : state.selectedIncident,
      };
    case 'DELETE_INCIDENT':
      return {
        ...state,
        incidents: state.incidents.filter(incident => incident.id !== action.payload),
        selectedIncident: state.selectedIncident?.id === action.payload 
          ? null 
          : state.selectedIncident,
      };
    default:
      return state;
  }
};

export const IncidentProvider = ({ children }) => {
  const [state, dispatch] = useReducer(incidentReducer, initialState);

  const fetchIncidents = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const incidents = await incidentService.getAllIncidents();
      dispatch({ type: 'SET_INCIDENTS', payload: incidents });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      toast.error('Failed to fetch incidents');
    }
  };

  const createIncident = async (incidentData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const newIncident = await incidentService.createIncident(incidentData);
      dispatch({ type: 'ADD_INCIDENT', payload: newIncident });
      toast.success('Incident created successfully');
      return newIncident;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      toast.error('Failed to create incident');
      throw error;
    }
  };

  const getIncidentById = async (id) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const incident = await incidentService.getIncidentById(id);
      dispatch({ type: 'SET_SELECTED_INCIDENT', payload: incident });
      return incident;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      toast.error('Failed to fetch incident details');
      throw error;
    }
  };

  const updateIncident = async (id, updateData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const updatedIncident = await incidentService.updateIncident(id, updateData);
      dispatch({ type: 'UPDATE_INCIDENT', payload: updatedIncident });
      toast.success('Incident updated successfully');
      return updatedIncident;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      toast.error('Failed to update incident');
      throw error;
    }
  };

  const deleteIncident = async (id) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      await incidentService.deleteIncident(id);
      dispatch({ type: 'DELETE_INCIDENT', payload: id });
      toast.success('Incident deleted successfully');
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      toast.error('Failed to delete incident');
      throw error;
    }
  };

  useEffect(() => {
    fetchIncidents();
  }, []);

  const value = {
    ...state,
    fetchIncidents,
    createIncident,
    getIncidentById,
    updateIncident,
    deleteIncident,
  };

  return (
    <IncidentContext.Provider value={value}>
      {children}
    </IncidentContext.Provider>
  );
};

export const useIncidents = () => {
  const context = useContext(IncidentContext);
  if (!context) {
    throw new Error('useIncidents must be used within an IncidentProvider');
  }
  return context;
};
