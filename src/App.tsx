import { useState } from 'react';
import PartsManagement from './PartsManagement';
import PartDetail from './PartDetail';
import TemplateManagement from './TemplateManagement';
import { Package, FileText } from 'lucide-react';

type View = 'parts' | 'templates' | 'part-create' | 'part-edit';

function App() {
  const [activeView, setActiveView] = useState<View>('parts');
  const [editingPartId, setEditingPartId] = useState<number | null>(null);

  const handleCreatePart = () => {
    setActiveView('part-create');
    setEditingPartId(null);
  };

  const handleEditPart = (partId: number) => {
    setActiveView('part-edit');
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
            onViewPart={(id) => console.log('View part', id)}
          />
        )}

        {(activeView === 'part-create' || activeView === 'part-edit') && (
          <PartDetail
            partId={editingPartId}
            onBack={handleBackToParts}
            onSave={handleSavePart}
          />
        )}

        {activeView === 'templates' && (
          <TemplateManagement
            onCreateTemplate={() => console.log('Create template')}
            onEditTemplate={(id) => console.log('Edit template', id)}
          />
        )}
      </div>
    </div>
  );
}

export default App;
