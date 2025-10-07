import { useState } from 'react';
import PartsManagement from './PartsManagement';
import PartDetail from './PartDetail';
import PartView from './PartView';
import TemplateManagement from './TemplateManagement';
import TemplateDetail from './TemplateDetail';
import { Package, FileText } from 'lucide-react';

type View = 'parts' | 'templates' | 'part-create' | 'part-edit' | 'part-view' | 'template-create' | 'template-edit';

function App() {
  const [activeView, setActiveView] = useState<View>('parts');
  const [editingPartId, setEditingPartId] = useState<number | null>(null);
  const [editingTemplateId, setEditingTemplateId] = useState<number | null>(null);

  const handleCreatePart = () => {
    setActiveView('part-create');
    setEditingPartId(null);
  };

  const handleEditPart = (partId: number) => {
    setActiveView('part-edit');
    setEditingPartId(partId);
  };

  const handleViewPart = (partId: number) => {
    setActiveView('part-view');
    setEditingPartId(partId);
  };

  const handleBackToParts = () => {
    setActiveView('parts');
    setEditingPartId(null);
  };

  const handleSavePart = (partData: any) => {
    console.log('Saving part:', partData);
    alert(`Part ${editingPartId ? 'updated' : 'created'} successfully!`);
    setActiveView('parts');
    setEditingPartId(null);
  };

  const handleCreateTemplate = () => {
    setActiveView('template-create');
    setEditingTemplateId(null);
  };

  const handleEditTemplate = (templateId: number) => {
    setActiveView('template-edit');
    setEditingTemplateId(templateId);
  };

  const handleBackToTemplates = () => {
    setActiveView('templates');
    setEditingTemplateId(null);
  };

  const handleSaveTemplate = (templateData: any) => {
    console.log('Saving template:', templateData);
    alert(`Template ${editingTemplateId ? 'updated' : 'created'} successfully!`);
    setActiveView('templates');
    setEditingTemplateId(null);
  };

  const handleCreatePartFromTemplate = (templateId: number) => {
    setActiveView('part-create');
    setEditingPartId(null);
    setEditingTemplateId(templateId);
  };

  return (
    <div className="h-screen flex flex-col">
      {(activeView === 'parts' || activeView === 'templates') && (
        <nav className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold text-gray-900 mr-8">Equipment Management System</h1>

            <button
              onClick={() => setActiveView('parts')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                activeView === 'parts'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Package className="h-4 w-4" />
              <span>Parts Management</span>
            </button>

            <button
              onClick={() => setActiveView('templates')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                activeView === 'templates'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <FileText className="h-4 w-4" />
              <span>Template Management</span>
            </button>
          </div>
        </nav>
      )}

      <div className="flex-1 overflow-hidden">
        {activeView === 'parts' && (
          <PartsManagement
            onCreatePart={handleCreatePart}
            onEditPart={handleEditPart}
            onViewPart={handleViewPart}
          />
        )}

        {activeView === 'part-view' && editingPartId && (
          <PartView
            partId={editingPartId}
            onBack={handleBackToParts}
          />
        )}

        {(activeView === 'part-create' || activeView === 'part-edit') && (
          <PartDetail
            partId={editingPartId}
            templateId={editingTemplateId}
            onBack={() => {
              if (editingTemplateId) {
                setActiveView('template-edit');
              } else {
                handleBackToParts();
              }
            }}
            onSave={(partData) => {
              handleSavePart(partData);
              if (editingTemplateId) {
                setEditingTemplateId(null);
              }
            }}
          />
        )}

        {activeView === 'templates' && (
          <TemplateManagement
            onCreateTemplate={handleCreateTemplate}
            onEditTemplate={handleEditTemplate}
          />
        )}

        {(activeView === 'template-create' || activeView === 'template-edit') && (
          <TemplateDetail
            templateId={editingTemplateId}
            onBack={handleBackToTemplates}
            onSave={handleSaveTemplate}
            onCreatePart={handleCreatePartFromTemplate}
          />
        )}
      </div>
    </div>
  );
}

export default App;
